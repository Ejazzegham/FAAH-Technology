"use client";

import { useEffect, useState } from "react";
import { PRICING_GROUPS } from "@/lib/pricing";
import { subscribePricingTiers, type FirestorePricingTier } from "@/lib/firestore/pricing";
import OrderModal from "@/components/OrderModal";

const ICONS: Record<string, JSX.Element> = {
  logo: <path d="M12 3l7 3v5c0 4.4-3 8.4-7 10-4-1.6-7-5.6-7-10V6l7-3z" />,
  stationery: <path d="M4 19l12-12 3 3-12 12H4v-3z" />,
  social: (
    <>
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <path d="M8.1 10.8L15.9 7.2M8.1 13.2l7.8 3.6" />
    </>
  ),
  shield: <path d="M12 2l8 3v6c0 5-3.4 8.6-8 11-4.6-2.4-8-6-8-11V5l8-3z" />,
  browser: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.3h.01M10 6.3h.01" />
    </>
  ),
  code: <path d="M8 6L2 12l6 6M16 6l6 6-6 6M13.5 4l-3 16" />,
  cart: (
    <>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h3l2.6 12.4a2 2 0 002 1.6h8.2a2 2 0 002-1.6L21 7H6" />
    </>
  ),
  phone: <rect x="7" y="2" width="10" height="20" rx="2" />,
  phoneCode: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M9.5 9L7.5 11l2 2M14.5 9l2 2-2 2" />
    </>
  ),
  desktop: <path d="M4 4h16v12H4zM2 20h20M9 20l1-4h4l1 4" />,
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  chart: <path d="M4 20V10M11 20V4M18 20v-7" />,
  play: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 9l5 3-5 3V9z" />
    </>
  ),
  pen: <path d="M4 19l1-4L15.5 4.5a1.5 1.5 0 012 2L7 17l-4 2zM13.5 6.5l2 2" />,
  custom: (
    <path d="M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
  ),
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name] ?? ICONS.custom}
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex justify-center gap-0.5 text-gold" aria-hidden>
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
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.5 9.4l6.6-.9L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function PricingExplorer() {
  const [selectedGroupSlug, setSelectedGroupSlug] = useState<string | null>(null);
  const [selectedSubSlug, setSelectedSubSlug] = useState<string | null>(null);
  const [tiers, setTiers] = useState<FirestorePricingTier[]>([]);
  const [orderingTier, setOrderingTier] = useState<FirestorePricingTier | null>(null);

  const selectedGroup = PRICING_GROUPS.find((g) => g.slug === selectedGroupSlug) ?? null;
  const selectedSub =
    selectedGroup?.subcategories.find((s) => s.slug === selectedSubSlug) ??
    selectedGroup?.subcategories[0] ??
    null;

  useEffect(() => {
    if (!selectedSub) {
      setTiers([]);
      return;
    }
    const unsub = subscribePricingTiers(selectedSub.slug, setTiers);
    return () => unsub?.();
  }, [selectedSub]);

  function handleSelectGroup(slug: string) {
    setSelectedGroupSlug((prev) => (prev === slug ? null : slug));
    setSelectedSubSlug(null);
  }

  return (
    <>
      {/* Intro copy above the 4 main service cards */}
      <div className="section pb-0 pt-0">
        <div
          className="rgb-box w-full rounded-xl px-6 py-10 sm:px-12 lg:px-16"
          style={{ ["--box-fill" as string]: "#0f0f13" }}
        >
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Pricing Built Around <span className="text-gold">Your Business Growth</span>
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
            <p>
              Every business has unique goals, challenges, and opportunities.
              That&apos;s why our pricing plans are designed to provide the
              perfect balance of quality, performance, and value for
              businesses at every stage—from startups and small businesses to
              growing brands and established enterprises.
            </p>
            <p>
              Each package is carefully tailored to deliver exceptional
              design, modern development, seamless user experiences, and
              scalable solutions that support long-term success. We focus on
              creating digital products that not only look professional but
              also help improve engagement, strengthen your brand, and drive
              measurable results.
            </p>
            <p>
              With transparent pricing, clear deliverables, and no hidden
              costs, you can invest with confidence knowing exactly what
              you&apos;re getting. Whether you need a simple business
              website, a complete brand identity, custom software, or an
              advanced digital platform, our solutions are built to grow
              alongside your business and adapt to your evolving needs.
            </p>
          </div>
        </div>
      </div>

      {/* Level 1 — the 4 main service cards */}
      <div className="section pt-8">
        <h3 className="text-center font-display text-2xl font-semibold text-white sm:text-3xl">
          Our <span className="text-gold">Services</span>
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted">
          Choose the services that best fit your business goals and project requirements.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PRICING_GROUPS.map((group) => {
            const isActive = group.slug === selectedGroupSlug;
            return (
              <button
                key={group.slug}
                onClick={() => handleSelectGroup(group.slug)}
                className={`rgb-box flex flex-col items-center justify-center gap-3 rounded-xl px-4 py-8 text-center transition-transform hover:-translate-y-0.5 ${
                  isActive ? "shadow-gold" : ""
                }`}
                style={{
                  ["--box-fill" as string]: "#0f0f13",
                  ...(isActive
                    ? {
                        backgroundImage:
                          "linear-gradient(#0f0f13,#0f0f13), linear-gradient(#d4a24e,#d4a24e)",
                      }
                    : {}),
                }}
                aria-pressed={isActive}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-lg border ${
                    isActive ? "border-gold text-gold" : "border-gold/30 text-gold/80"
                  }`}
                >
                  <Icon name={group.icon} size={22} />
                </span>
                <span
                  className={`text-sm font-semibold leading-tight ${
                    isActive ? "text-gold" : "text-muted"
                  }`}
                >
                  {group.label}
                </span>
                <span className="text-[11px] text-muted/70">
                  {group.subcategories.length} packages available
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Level 2 — sub-categories + pricing tiers for the selected card */}
      {selectedGroup && selectedSub && (
        <div className="section pt-0 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {selectedGroup.subcategories.map((sub) => {
              const isActive = sub.slug === selectedSub.slug;
              return (
                <button
                  key={sub.slug}
                  onClick={() => setSelectedSubSlug(sub.slug)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? "border-gold bg-gold-gradient text-bg"
                      : "border-line text-muted hover:text-white"
                  }`}
                >
                  <Icon name={sub.icon} size={14} />
                  {sub.label}
                </button>
              );
            })}
          </div>

          <p className="mt-8 flex items-center justify-center gap-3">
            <span className="text-gold">
              <Icon name={selectedSub.icon} size={22} />
            </span>
            <span className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {selectedSub.label} <span className="text-gold">Packages</span>
            </span>
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
            Tailored {selectedSub.label.toLowerCase()} packages designed to fit projects of every
            size and budget.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-5">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rgb-box relative flex flex-col rounded-xl p-6 pt-8 ${
                  tier.highlighted ? "shadow-gold" : ""
                }`}
                style={{
                  ["--box-fill" as string]: "#131318",
                  ...(tier.highlighted
                    ? {
                        backgroundImage:
                          "linear-gradient(#131318,#131318), linear-gradient(#d4a24e,#d4a24e)",
                      }
                    : {}),
                }}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-gradient px-4 py-1 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-bg">
                    {tier.badge}
                  </span>
                )}
                <div className="text-center">
                  <h3 className="font-display text-base font-semibold text-white">{tier.name}</h3>
                  <div className="mt-2">
                    <Stars count={tier.stars} />
                  </div>
                  <p className="mt-3 font-display text-3xl font-bold text-gold">{tier.price}</p>
                  <p className="text-[11px] text-muted">{tier.priceNote}</p>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mt-0.5 shrink-0 text-gold"
                      >
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setOrderingTier(tier)}
                  className="btn-primary mt-6 w-full justify-center"
                >
                  {tier.cta}
                  <span aria-hidden>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {orderingTier && selectedSub && (
        <OrderModal
          categoryLabel={selectedSub.label}
          tierName={orderingTier.name}
          price={orderingTier.price}
          onClose={() => setOrderingTier(null)}
        />
      )}
    </>
  );
}
