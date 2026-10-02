"use client";

import { openChat } from "../lib/chatEvents";
import { SparkIcon } from "./Icons";

interface AskAIButtonProps {
  className?: string;
  label?: string;
}

// Opens the floating chat widget from server-rendered sections.
export default function AskAIButton({ className = "", label = "Ask my AI" }: AskAIButtonProps) {
  return (
    <button type="button" onClick={() => openChat()} className={className}>
      <SparkIcon className="w-4 h-4" />
      {label}
    </button>
  );
}
