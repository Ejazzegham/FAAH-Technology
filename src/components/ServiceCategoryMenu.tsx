"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";

export type ServiceCategory = {
  title: string;
  icon: JSX.Element;
  items: string[];
};

type Props = {
  eyebrow: string;
  heading: ReactNode;
  subheading: ReactNode;
  categories: ServiceCategory[];
};

/** Matches the grid-cols-2 / sm:grid-cols-3 / lg:grid-cols-4 classes below —
 * needed so we know how many boxes are in the active box's row, at the
 * current screen size, so the dropdown can be inserted right after it. */
function useColumnCount() {
  // Always start at the same value on the server and on the client's first
  // render (hydration) — reading window.innerWidth here would make the
  // server and client render different DOM trees and throw a hydration
  // error. The real value is applied a moment later in the effect below,
  // client-side only.
  const [cols, setCols] = useState(2);

  useEffect(() => {
    const mqSm = window.matchMedia("(min-width: 640px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const update = () => setCols(mqLg.matches ? 4 : mqSm.matches ? 3 : 2);
    update();
    mqSm.addEventListener("change", update);
    mqLg.addEventListener("change", update);
    return () => {
      mqSm.removeEventListener("change", update);
      mqLg.removeEventListener("change", update);
    };
  }, []);

  return cols;
}

/**
 * Premium, centered category menu used across every service page
 * (Graphic Design, Web Development, Mobile App, Desktop Software).
 *
 * All category boxes sit in a centered grid. Clicking a box opens a
 * dropdown panel right underneath that box's row — never at the bottom of
 * the whole grid — so you never have to scroll to find what you opened.
 */
export default function ServiceCategoryMenu({
  eyebrow,
  heading,
  subheading,
  categories,
}: Props) {
  const [active, setActive] = useState<number | null>(0);
  const cols = useColumnCount();
  const totalServices = categories.reduce((sum, c) => sum + c.items.length, 0);

  // Figure out the last box index in the same row as the active box, so the
  // panel can be placed immediately after that row, regardless of which
  // box in the row was actually clicked.
  let rowEndOfActive: number | null = null;
  if (active !== null) {
    const rowStart = Math.floor(active / cols) * cols;
    rowEndOfActive = Math.min(rowStart + cols - 1, categories.length - 1);
  }

  return (
    <section id="services" className="section">
      <div className="mx-auto max-w-2xl text-center">
        <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
          <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
          {eyebrow}
          <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {subheading}
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat, i) => {
          const isActive = i === active;
          return (
            <Fragment key={cat.title}>
              <button
                type="button"
                onClick={() => setActive(isActive ? null : i)}
                aria-expanded={isActive}
                style={{ ["--box-fill" as string]: isActive ? "#eaf2ff" : "#ffffff" }}
                className={`rgb-box group relative flex flex-col items-center gap-3 rounded-xl px-4 py-6 text-center transition-colors duration-200 ${
                  isActive ? "text-gold" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                    isActive
                      ? "border-gold/60 text-gold"
                      : "border-line text-muted group-hover:border-gold/40 group-hover:text-ink"
                  }`}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {cat.icon}
                  </svg>
                </span>

                <span className="text-sm font-semibold leading-snug">
                  {cat.title}
                </span>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    isActive ? "bg-gold/20 text-gold" : "bg-black/5 text-muted"
                  }`}
                >
                  {cat.items.length} services
                </span>

                <svg
                  aria-hidden
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`absolute right-3 top-3 text-muted transition-transform duration-200 ${
                    isActive ? "rotate-180 text-gold" : "group-hover:text-ink"
                  }`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown is inserted right after the last box in this
                  row, so it always opens next to what you clicked. */}
              {rowEndOfActive === i && active !== null && (
                <div
                  key={`${cat.title}-panel`}
                  className="col-span-full grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out"
                >
                  <div className="overflow-hidden">
                    <div className="mt-2 rounded-2xl border border-gold/30 bg-bg-card p-6 sm:p-8">
                      <div className="mb-6 flex items-center gap-4 border-b border-line pb-6">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gold/40 text-gold">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {categories[active].icon}
                          </svg>
                        </span>
                        <div>
                          <h3 className="font-display text-xl font-semibold text-ink">
                            {categories[active].title}
                          </h3>
                          <p className="text-xs text-muted">
                            {categories[active].items.length} services included
                            in this category
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActive(null)}
                          aria-label="Close"
                          className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-gold/40 hover:text-gold"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <path d="M6 6l12 12M18 6L6 18" />
                          </svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {categories[active].items.map((item, idx) => (
                          <div
                            key={item}
                            className="rgb-box flex items-center gap-3 rounded-lg px-4 py-3.5"
                            style={{ ["--box-fill" as string]: "#ffffff" }}
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gold/40 font-display text-[11px] font-semibold text-gold">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <p className="text-sm font-medium leading-snug text-ink/90">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-muted">
        {totalServices}+ services across {categories.length} categories —
        tap a category above to see what&apos;s included.
      </p>
    </section>
  );
}
