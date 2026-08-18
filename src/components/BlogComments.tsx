"use client";

import { useEffect, useState } from "react";
import { subscribeApprovedComments, submitComment, type BlogComment } from "@/lib/firestore/blog";

export default function BlogComments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeApprovedComments(postId, setComments);
    return () => unsub?.();
  }, [postId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setSending(true);
    setError(null);
    try {
      await submitComment({ postId, name: name.trim(), email: email.trim(), comment: comment.trim() });
      setName("");
      setEmail("");
      setComment("");
      setSent(true);
    } catch {
      setError("Couldn't post your comment right now. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="mt-16 border-t border-line pt-10">
      <h2 className="font-display text-xl font-semibold text-ink">
        Comments {comments.length > 0 && <span className="text-muted">({comments.length})</span>}
      </h2>

      {comments.length > 0 && (
        <ul className="mt-6 space-y-5">
          {comments.map((c) => (
            <li
              key={c.id}
              className="rgb-box rounded-lg p-4"
              style={{ ["--box-fill" as string]: "#ffffff" }}
            >
              <p className="text-sm font-semibold text-gold">{c.name}</p>
              <p className="mt-1 text-xs text-muted">{c.comment}</p>
            </li>
          ))}
        </ul>
      )}

      <div
        className="rgb-box mt-8 rounded-xl p-6"
        style={{ ["--box-fill" as string]: "#ffffff" }}
      >
        <h3 className="text-sm font-semibold text-ink">Leave a comment</h3>
        <p className="mt-1 text-xs text-muted">
          Comments are reviewed before they appear publicly.
        </p>
        {sent ? (
          <p className="mt-4 text-sm text-emerald-400">
            Thanks! Your comment has been submitted and will appear once approved.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-gold focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-gold focus:outline-none"
              />
            </div>
            <textarea
              required
              rows={4}
              placeholder="Your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-gold focus:outline-none"
            />
            {error && <p className="text-xs text-rose-400">{error}</p>}
            <button type="submit" disabled={sending} className="btn-primary disabled:opacity-60">
              {sending ? "Posting…" : "Post Comment"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
