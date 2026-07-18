"use client";

import { deleteSubscriber, type Subscriber } from "@/lib/firestore/subscribers";

function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AdminSubscribersList({ subscribers }: { subscribers: Subscriber[] }) {
  async function handleDelete(id: string, email: string) {
    if (!confirm(`Remove ${email} from the subscriber list?`)) return;
    try {
      await deleteSubscriber(id);
    } catch {
      // ignore
    }
  }

  return (
    <div className="card !p-6 sm:!p-8">
      <h3 className="font-display text-lg font-semibold text-white">All Subscribers</h3>
      <p className="mt-1 text-xs text-muted">{subscribers.length} total</p>

      {subscribers.length === 0 ? (
        <p className="mt-8 text-center text-xs text-muted">No subscribers yet.</p>
      ) : (
        <ul className="mt-6 divide-y divide-line">
          {subscribers.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm text-white">{s.email}</p>
                <p className="text-[11px] text-muted">Subscribed {formatDate(s.createdAt)}</p>
              </div>
              <button
                onClick={() => handleDelete(s.id, s.email)}
                aria-label={`Remove ${s.email}`}
                className="shrink-0 text-muted hover:text-rose-400"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
