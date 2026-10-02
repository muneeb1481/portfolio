"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { OPEN_CHAT_EVENT, type OpenChatDetail } from "../lib/chatEvents";
import { profile } from "../data/profile";
import { ArrowRightIcon, CloseIcon, SparkIcon } from "./Icons";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "What are your strongest skills?",
  "Tell me about your voice AI projects",
  "What is your work experience?",
  "How can I contact you?",
];

const FALLBACK_ERROR = "Something went wrong. Please try again.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || loading) return;

      const history: Message[] = [...messages, { role: "user", content: question }];
      setMessages([...history, { role: "assistant", content: "" }]);
      setInput("");
      setError(null);
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => null);
          throw new Error(typeof data?.error === "string" ? data.error : FALLBACK_ERROR);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          setMessages([...history, { role: "assistant", content: answer }]);
        }
        if (!answer.trim()) throw new Error(FALLBACK_ERROR);
      } catch (err) {
        // Drop the empty assistant bubble and let the visitor retry.
        setMessages(history);
        setError(err instanceof Error && err.message ? err.message : FALLBACK_ERROR);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  // Other sections open the widget through a window event.
  useEffect(() => {
    const onOpen = (event: Event) => {
      setOpen(true);
      const question = (event as CustomEvent<OpenChatDetail>).detail?.question;
      if (question) send(question);
    };
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, [send]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep the newest message in view while the answer streams in.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, error, open]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    send(input);
  };

  const lastMessage = messages[messages.length - 1];
  const waitingForFirstToken = loading && lastMessage?.role === "assistant" && !lastMessage.content;

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close chat" : "Ask Muneeb's AI assistant"}
        aria-expanded={open}
        className="btn-gold fixed bottom-5 right-5 z-[60] h-14 px-5 rounded-full text-sm shadow-[0_10px_40px_rgba(212,175,55,0.35)] animate-pulse-glow"
      >
        {open ? <CloseIcon className="w-5 h-5" /> : <SparkIcon className="w-5 h-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask my AI"}</span>
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-label="Chat with Muneeb's AI assistant"
        aria-hidden={!open}
        className={`fixed z-[60] bottom-24 right-5 flex flex-col w-[min(25rem,calc(100vw-2.5rem))] h-[min(36rem,calc(100dvh-8rem))] rounded-2xl overflow-hidden border border-gold-500/30 bg-[#0d0c0a]/95 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(212,175,55,0.12)] origin-bottom-right transition-all duration-300 ${
          open ? "visible opacity-100 translate-y-0 scale-100" : "invisible opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gold-500/15 bg-gradient-to-r from-gold-500/10 to-transparent">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold-400/50 flex-shrink-0">
            <Image src="/photos/hero.jpeg" alt="" fill sizes="40px" className="object-cover object-top" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-stone-100">Ask about {profile.firstName}</p>
            <p className="flex items-center gap-1.5 text-[11px] text-stone-400">
              <span className="status-dot w-1.5 h-1.5" />
              AI assistant · answers from my portfolio
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="ml-auto p-2 rounded-lg text-stone-400 hover:text-gold-200 hover:bg-white/5 transition-colors"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="chat-scroll flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3">
          <div className="max-w-[88%] rounded-2xl rounded-tl-md px-4 py-3 bg-white/[0.04] border border-white/[0.06] text-sm text-stone-300 leading-relaxed">
            Hi! I&apos;m an AI trained on {profile.firstName}&apos;s profile, and I answer as {profile.firstName}.
            Ask me about my projects, skills, experience or how to get in touch.
          </div>

          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => send(suggestion)}
                  className="px-3 py-1.5 rounded-full border border-gold-500/25 bg-gold-500/[0.05] text-xs text-gold-200 text-left transition-all duration-300 hover:border-gold-400/60 hover:bg-gold-500/[0.12]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {messages.map((message, idx) =>
            message.role === "user" ? (
              <div key={idx} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-md px-4 py-2.5 bg-gradient-to-br from-gold-300 to-gold-600 text-sm text-[#1a1405] font-medium leading-relaxed whitespace-pre-wrap break-words">
                  {message.content}
                </div>
              </div>
            ) : (
              <div key={idx} className="max-w-[88%] rounded-2xl rounded-tl-md px-4 py-3 bg-white/[0.04] border border-white/[0.06] text-sm text-stone-200 leading-relaxed whitespace-pre-wrap break-words">
                {message.content ? (
                  message.content.replaceAll("**", "")
                ) : (
                  <span className="flex items-center gap-1.5 py-1" aria-label="Thinking">
                    <span className="chat-dot" />
                    <span className="chat-dot" />
                    <span className="chat-dot" />
                  </span>
                )}
              </div>
            )
          )}

          {error && (
            <div role="alert" className="rounded-xl px-4 py-2.5 border border-red-500/30 bg-red-500/10 text-xs text-red-200">
              {error}
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={onSubmit} className="p-3 border-t border-gold-500/15">
          <div className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 focus-within:border-gold-500/50 transition-colors">
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={waitingForFirstToken ? "Thinking…" : "Ask anything about me…"}
              maxLength={500}
              aria-label="Your question"
              className="flex-1 min-w-0 bg-transparent text-sm text-stone-100 placeholder:text-stone-500 outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="btn-gold w-9 h-9 rounded-lg flex-shrink-0 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-stone-600">
            AI-generated answers. For anything important, email {profile.email}
          </p>
        </form>
      </div>
    </>
  );
}
