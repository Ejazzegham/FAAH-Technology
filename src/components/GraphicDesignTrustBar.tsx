const BADGES = [
  {
    title: "100% Custom Designs",
    desc: "Created from scratch for your brand",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 12.5l1.8 1.8 3.2-4" />
      </>
    ),
  },
  {
    title: "Unlimited Revisions",
    desc: "We refine until you're satisfied",
    icon: <path d="M3 12a9 9 0 0115.4-6.4M21 12a9 9 0 01-15.4 6.4M17 3v5h-5M7 21v-5h5" />,
  },
  {
    title: "Full Copyright Ownership",
    desc: "Final files are 100% yours",
    icon: <path d="M12 2l8 3v6c0 5-3.4 8.6-8 11-4.6-2.4-8-6-8-11V5l8-3zM9.5 12l1.8 1.8 3.2-4" />,
  },
  {
    title: "Print & Digital Ready",
    desc: "Optimized for every platform",
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </>
    ),
  },
  {
    title: "NDA & Confidentiality",
    desc: "Your ideas stay protected",
    icon: (
      <>
        <rect x="5" y="11" width="14" height="9" rx="1.5" />
        <path d="M8 11V8a4 4 0 018 0v3" />
      </>
    ),
  },
];

export default function GraphicDesignTrustBar() {
  return (
    <div className="section py-0">
      <div className="rgb-box grid grid-cols-2 gap-x-6 gap-y-6 rounded-xl px-8 py-6 sm:grid-cols-3 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none lg:gap-x-5">
        {BADGES.map((b) => (
          <div key={b.title} className="flex items-center gap-3 justify-center lg:justify-start">
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
              <p className="text-xs font-semibold text-white">{b.title}</p>
              <p className="text-[11px] text-muted">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
