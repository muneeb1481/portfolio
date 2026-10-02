// Lets any section (hero, navbar, contact) open the floating chat widget,
// optionally sending a first question.
export const OPEN_CHAT_EVENT = "portfolio:open-chat";

export interface OpenChatDetail {
  question?: string;
}

export function openChat(question?: string) {
  window.dispatchEvent(
    new CustomEvent<OpenChatDetail>(OPEN_CHAT_EVENT, { detail: { question } })
  );
}
