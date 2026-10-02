import { buildSystemPrompt } from "../../lib/chatPrompt";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL ?? "openai/gpt-oss-120b";

const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 1000;

// Small in-memory limiter so a public visitor cannot burn through the API key.
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages: ChatMessage[] = [];
  for (const item of raw.slice(-MAX_MESSAGES)) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string" || !content.trim()) return null;
    messages.push({ role, content: content.slice(0, MAX_MESSAGE_CHARS) });
  }
  if (messages[messages.length - 1].role !== "user") return null;
  return messages;
}

function errorResponse(error: string, status: number) {
  return Response.json({ error }, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return errorResponse("The chat assistant is not configured yet.", 503);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (isRateLimited(ip)) {
    return errorResponse("Too many questions in a short time. Please try again in a few minutes.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid request.", 400);
  }
  const messages = parseMessages(body);
  if (!messages) {
    return errorResponse("Invalid request.", 400);
  }

  let upstream: Response;
  try {
    upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
        stream: true,
        temperature: 0.4,
        max_completion_tokens: 900,
        reasoning_effort: "low",
        include_reasoning: false,
      }),
    });
  } catch {
    return errorResponse("Could not reach the AI service. Please try again.", 502);
  }

  if (!upstream.ok || !upstream.body) {
    console.error("Groq request failed:", upstream.status, await upstream.text().catch(() => ""));
    const status = upstream.status === 429 ? 429 : 502;
    return errorResponse(
      status === 429
        ? "The assistant is busy right now. Please try again in a moment."
        : "The AI service returned an error. Please try again.",
      status
    );
  }

  // Convert Groq's server-sent events into a plain text stream of the answer.
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const data = trimmed.slice(5).trim();
        if (data === "[DONE]") continue;
        try {
          const text = JSON.parse(data).choices?.[0]?.delta?.content;
          if (typeof text === "string" && text) {
            controller.enqueue(encoder.encode(text));
          }
        } catch {
          // Ignore malformed keep-alive lines.
        }
      }
    },
    cancel() {
      reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
