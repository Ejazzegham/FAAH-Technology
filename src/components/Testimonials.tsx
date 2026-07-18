"use client";

import { useEffect, useState } from "react";
import { subscribeReviews, type Review } from "@/lib/firestore/reviews";

const PAGE_SIZE = 3;

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2l2.9 6.26L21.5 9l-5 4.87L17.8 21 12 17.6 6.2 21l1.3-7.13-5-4.87 6.6-.74L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const unsub = subscribeReviews(setReviews);
    return () => unsub?.();
  }, []);

  if (reviews.length === 0) return null;

  const featured = reviews[0];
  // Every other review is in the pool — Next/Prev pages through all of them,
  // not just a fixed set of three.
  const pool = reviews.length > 1 ? reviews.slice(1) : reviews;
  const totalPages = Math.max(1, Math.ceil(pool.length / PAGE_SIZE));
  const safePage = page % totalPages;
  const visible = pool.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const featuredFirstName = featured.name.trim().split(/\s+/)[0] || featured.name;

  return (
    <section id="testimonials" className="section grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <div className="card flex flex-col justify-between">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
            <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
            TESTIMONIALS
            <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-white">
            What {featuredFirstName} Says
          </h2>
          <p className="mt-6 font-display text-3xl text-gold">&ldquo;</p>
          <p className="text-sm leading-relaxed text-white/85">{featured.text}</p>
        </div>
        <div className="mt-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-sm font-semibold text-gold">
            {featured.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{featured.name}</p>
            <Stars count={featured.rating} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
              <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
              CLIENT REVIEWS
              <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white">
              Our Clients Love Our Work
            </h2>
          </div>
          {totalPages > 1 && (
            <div className="hidden items-center gap-3 sm:flex">
              <span className="text-[11px] text-muted">
                {safePage + 1} / {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  aria-label="Previous reviews"
                  onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:border-gold hover:text-gold"
                >
                  ‹
                </button>
                <button
                  aria-label="Next reviews"
                  onClick={() => setPage((p) => (p + 1) % totalPages)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:border-gold hover:text-gold"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {visible.map((r) => (
            <div key={r.id} className="rgb-box rounded-lg p-5" style={{ ["--box-fill" as string]: "#131318" }}>
              <Stars count={r.rating} />
              <p className="mt-3 text-xs leading-relaxed text-muted">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-xs font-semibold text-gold">
                  {r.name.charAt(0)}
                </div>
                <p className="text-xs font-semibold text-white">{r.name}</p>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2 sm:hidden">
            <button
              aria-label="Previous reviews"
              onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:border-gold hover:text-gold"
            >
              ‹
            </button>
            <span className="flex items-center px-2 text-[11px] text-muted">
              {safePage + 1} / {totalPages}
            </span>
            <button
              aria-label="Next reviews"
              onClick={() => setPage((p) => (p + 1) % totalPages)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:border-gold hover:text-gold"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
