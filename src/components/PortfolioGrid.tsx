"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORY_LABELS, type Project, type ProjectCategory } from "@/lib/projects";
import ProjectReactions from "@/components/ProjectReactions";

const FILTERS: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "ALL", value: "all" },
  { label: "GRAPHIC DESIGN", value: "graphic" },
  { label: "WEB DESIGN & DEVELOPMENT", value: "web" },
  { label: "MOBILE APP DESIGN & DEVELOPMENT", value: "mobile" },
  { label: "DESKTOP SOFTWARE", value: "desktop" },
];

// Projects shown per page. Page count is derived automatically from this,
// so any newly added project (however many the admin uploads) is picked up
// on the next render without touching this component.
const PAGE_SIZE = 9;

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [page, setPage] = useState(1);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter]
  );

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));

  // Reset to page 1 whenever the filter changes, or clamp down if the
  // current page no longer exists (e.g. projects were removed).
  useEffect(() => {
    setPage(1);
  }, [filter]);

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return visible.slice(start, start + PAGE_SIZE);
  }, [visible, page]);

  const goToPage = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    document.getElementById("portfolio-grid-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

  return (
    <div id="portfolio-grid-top" className="section pt-0">
      <div className="flex flex-wrap justify-center gap-3">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-md border px-4 py-2 text-xs font-semibold tracking-wide transition-colors ${
              filter === f.value
                ? "border-gold bg-gold/10 text-gold"
                : "border-line text-muted hover:border-gold/50 hover:text-gold"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paged.map((project) => {
          return (
            <Link
              key={project.id}
              href={`/portfolio/${project.id}`}
              className="portfolio-card group block"
            >
              <div className="portfolio-card-inner border border-line">
                {project.images && project.images.length > 0 ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.images[0]}
                      alt={`${project.title} — ${CATEGORY_LABELS[project.category]} project by HZ Technology`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={70}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {project.images.length > 1 && (
                      <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white">
                        {project.images.length} photos
                      </span>
                    )}
                  </div>
                ) : (
                  <div
                    className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${project.color}`}
                  >
                    <span className="font-display text-sm font-medium tracking-wide text-white/25">
                      {CATEGORY_LABELS[project.category]}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <h3 className="font-display text-sm font-semibold text-gold">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted">{CATEGORY_LABELS[project.category]}</p>
                  </div>
                  <span aria-hidden className="text-gold transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
                <div className="px-5 pb-4">
                  <ProjectReactions
                    projectId={project.id}
                    initialLikes={project.likeCount}
                    initialFavorites={project.favoriteCount}
                    size="sm"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="mt-16 text-center text-sm text-muted">
          No projects in this category yet — check back soon.
        </p>
      )}

      {visible.length > 0 && totalPages > 1 && (
        <nav
          aria-label="Portfolio pagination"
          className="mt-14 flex flex-wrap items-center justify-center gap-2"
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
    </div>
  );
}
