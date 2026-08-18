const BADGES = [
  {
    title: "100% Original",
    desc: "Unique designs from scratch",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 12.5l1.8 1.8 3.2-4" />
      </>
    ),
  },
  {
    title: "Unlimited Revisions",
    desc: "We work until you're satisfied",
    icon: <path d="M3 12a9 9 0 0115.4-6.4M21 12a9 9 0 01-15.4 6.4M17 3v5h-5M7 21v-5h5" />,
  },
  {
    title: "Fast Delivery",
    desc: "On-time delivery guaranteed",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
  },
  {
    title: "Money Back Guarantee",
    desc: "100% satisfaction guaranteed",
    icon: <path d="M12 2l8 3v6c0 5-3.4 8.6-8 11-4.6-2.4-8-6-8-11V5l8-3zM9.5 12l1.8 1.8 3.2-4" />,
  },
  {
    title: "Dedicated Support",
    desc: "Always here to help you",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
      </>
    ),
  },
];

export default function PricingTrustBar() {
  return (
    <div className="section pt-0">
      <div
        className="rgb-box flex flex-wrap items-center justify-center gap-x-10 gap-y-6 rounded-xl px-8 py-6"
        style={{ ["--box-fill" as string]: "#ffffff" }}
      >
        {BADGES.map((b) => (
          <div key={b.title} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {b.icon}
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold text-ink">{b.title}</p>
              <p className="text-[11px] text-muted">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
