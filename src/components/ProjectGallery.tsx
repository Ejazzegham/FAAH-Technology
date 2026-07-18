"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

// Images shown per page before paginating to the next set.
const PAGE_SIZE = 12;

export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(images.length / PAGE_SIZE));

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const pagedImages = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return images.slice(start, start + PAGE_SIZE).map((url, i) => ({ url, index: start + i }));
  }, [images, page]);

  const goToPage = useCallback(
    (p: number) => {
      setPage(Math.min(Math.max(1, p), totalPages));
      document.getElementById("project-gallery-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [totalPages]
  );

  // Compact page-number list: always show first, last, current, and its
  // immediate neighbors; collapse the rest into "…".
  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "ellipsis") {
        pages.push("ellipsis");
      }
    }
    return pages;
  }, [totalPages, page]);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, prev, next]);

  if (images.length === 0) return null;

  return (
    <>
      <div id="project-gallery-top" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {pagedImages.map(({ url, index }) => (
          <button
            key={url}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="portfolio-card group block"
          >
            <div className="portfolio-card-inner relative aspect-[4/3] overflow-hidden border border-line">
              <Image
                src={url}
                alt={`${title} — image ${index + 1} of ${images.length}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={70}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </button>
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Gallery pagination"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            className="flex h-9 min-w-9 items-center justify-center rounded-md border border-line px-3 text-xs font-semibold text-muted transition-colors hover:border-gold/50 hover:text-gold disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-muted"
          >
            ←
          </button>

          {pageNumbers.map((p, i) =>
            p === "ellipsis" ? (
              <span key={`ellipsis-${i}`} className="px-1 text-xs text-muted">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => goToPage(p)}
                aria-current={p === page ? "page" : undefined}
                className={`flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-xs font-semibold transition-colors ${
                  p === page
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-line text-muted hover:border-gold/50 hover:text-gold"
                }`}
              >
                {p}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
            className="flex h-9 min-w-9 items-center justify-center rounded-md border border-line px-3 text-xs font-semibold text-muted transition-colors hover:border-gold/50 hover:text-gold disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-muted"
          >
            →
          </button>
        </nav>
      )}

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image ${openIndex + 1} of ${images.length}`}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {images.length > 1 && (
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold sm:left-6"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <div
            className="lightbox-frame relative h-[80vh] w-full max-w-4xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex]}
              alt={`${title} — image ${openIndex + 1} of ${images.length}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {images.length > 1 && (
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold sm:right-6"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {images.length > 1 && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/70">
              {openIndex + 1} / {images.length}
            </p>
          )}
        </div>
      )}
    </>
  );
}
