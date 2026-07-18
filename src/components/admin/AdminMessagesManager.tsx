"use client";

import { useState } from "react";
import type { ContactMessage } from "@/lib/firestore/messages";

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AdminMessagesManager({
  messages,
  onMarkRead,
  onDelete,
}: {
  messages: ContactMessage[];
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const visible = filter === "unread" ? messages.filter((m) => !m.read) : messages;

  return (
    <div className="card !p-6 sm:!p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">Messages</h3>
          <p className="mt-1 text-xs text-muted">
            {messages.length} total · {messages.filter((m) => !m.read).length} unread
          </p>
        </div>
        <div className="flex gap-2 rounded-full border border-line p-1">
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors ${
                filter === f ? "bg-gold-gradient text-bg" : "text-muted hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="mt-8 text-center text-xs text-muted">
          {filter === "unread" ? "No unread messages." : "No messages yet — they'll appear here when someone submits the contact form."}
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {visible.map((m) => (
            <li
              key={m.id}
              className={`rounded-lg border px-4 py-3 ${
                m.read ? "border-line" : "border-gold/40 bg-gold/5"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-white">{m.name}</p>
                <span className="text-[10px] text-muted">{timeAgo(m.createdAt)}</span>
              </div>
              <p className="text-xs text-muted">{m.email}</p>
              <p className="mt-1 text-xs font-medium text-gold">{m.subject || "(no subject)"}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{m.message}</p>
              <div className="mt-3 flex items-center gap-4 text-[11px]">
                {!m.read && (
                  <button onClick={() => onMarkRead(m.id)} className="font-semibold text-gold hover:underline">
                    Mark as read
                  </button>
                )}
                <a href={`mailto:${m.email}`} className="text-muted hover:text-gold">
                  Reply
                </a>
                <button onClick={() => onDelete(m.id)} className="text-muted hover:text-rose-400">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
