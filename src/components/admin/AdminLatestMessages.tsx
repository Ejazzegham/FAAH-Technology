"use client";

import Link from "next/link";
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

export default function AdminLatestMessages({
  messages,
  onMarkRead,
  onDelete,
}: {
  messages: ContactMessage[];
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="card !p-6" id="manage-messages">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-white">Latest Messages</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted">
            {messages.filter((m) => !m.read).length} unread
          </span>
          <Link href="/admin/messages" className="text-xs font-semibold text-gold hover:underline">
            View all
          </Link>
        </div>
      </div>

      {messages.length === 0 ? (
        <p className="mt-6 text-center text-xs text-muted">
          No messages yet — they&apos;ll appear here when someone submits the contact form.
        </p>
      ) : (
        <ul className="mt-5 space-y-4">
          {messages.slice(0, 5).map((m) => (
            <li
              key={m.id}
              className={`rounded-lg border px-4 py-3 ${
                m.read ? "border-line" : "border-gold/40 bg-gold/5"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-white">{m.name}</p>
                <span className="text-[10px] text-muted">{timeAgo(m.createdAt)}</span>
              </div>
              <p className="mt-0.5 text-xs font-medium text-gold">{m.subject || "(no subject)"}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted">{m.message}</p>
              <div className="mt-2 flex items-center gap-3 text-[11px]">
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
