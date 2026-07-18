"use client";

import { useState } from "react";
import Link from "next/link";
import type { Review } from "@/lib/firestore/reviews";
import { addReview } from "@/lib/firestore/reviews";

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.5 9.4l6.6-.9L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function AdminRecentReviews({
  reviews,
  onDelete,
}: {
  reviews: Review[];
  onDelete: (id: string) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSaving(true);
    try {
      await addReview({ name, rating, text });
      setName("");
      setText("");
      setRating(5);
      setShowForm(false);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card !p-6" id="manage-reviews">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-white">Recent Reviews</h3>
        <div className="flex items-center gap-4">
          <Link href="/admin/reviews" className="text-xs font-semibold text-muted hover:text-gold hover:underline">
            View all
          </Link>
          <button onClick={() => setShowForm((v) => !v)} className="text-xs font-semibold text-gold hover:underline">
            {showForm ? "Cancel" : "+ Add Review"}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="mt-4 space-y-2 rounded-lg border border-line p-3">
          <input
            type="text"
            required
            placeholder="Client name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-line bg-bg px-3 py-2 text-xs text-white placeholder:text-muted focus:border-gold focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <label className="text-xs text-muted">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="rounded-md border border-line bg-bg px-2 py-1 text-xs text-white focus:border-gold focus:outline-none"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} star{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <textarea
            required
            rows={2}
            placeholder="Review text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-md border border-line bg-bg px-3 py-2 text-xs text-white placeholder:text-muted focus:border-gold focus:outline-none"
          />
          <button type="submit" disabled={saving} className="btn-primary w-full justify-center !py-2 !text-xs disabled:opacity-60">
            {saving ? "Saving…" : "Save Review"}
          </button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="mt-6 text-center text-xs text-muted">No reviews yet.</p>
      ) : (
        <ul className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {reviews.slice(0, 4).map((r) => (
            <li key={r.id} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-xs font-bold text-bg">
                {r.name.charAt(0)}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <span className="text-[10px] text-muted">{timeAgo(r.createdAt)}</span>
                </div>
                <Stars count={r.rating} />
                <p className="mt-1 text-xs leading-relaxed text-muted">{r.text}</p>
              </div>
              <button
                aria-label="Delete review"
                onClick={() => onDelete(r.id)}
                className="self-start text-muted hover:text-rose-400"
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
