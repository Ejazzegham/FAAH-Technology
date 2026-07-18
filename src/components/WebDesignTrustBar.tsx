const BADGES = [
  {
    title: "Responsive Design",
    desc: "Perfect on every screen size",
    icon: (
      <>
        <rect x="3" y="4" width="13" height="10" rx="1.5" />
        <rect x="17" y="8" width="4" height="10" rx="1" />
        <path d="M8 18h4" />
      </>
    ),
  },
  {
    title: "Clean Code",
    desc: "Built to scale and maintain easily",
    icon: <path d="M8 6l-5 6 5 6M16 6l5 6-5 6M13 4l-2 16" />,
  },
  {
    title: "SEO Friendly",
    desc: "Optimized to rank on Google",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </>
    ),
  },
  {
    title: "Fast Performance",
    desc: "Optimized speed & load times",
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  },
  {
    title: "Secure & Reliable",
    desc: "SSL, backups & best practices",
    icon: (
      <>
        <path d="M12 2l8 3v6c0 5-3.4 8.6-8 11-4.6-2.4-8-6-8-11V5l8-3z" />
        <path d="M9.5 12l1.8 1.8 3.2-4" />
      </>
    ),
  },
  {
    title: "Ongoing Support",
    desc: "Maintenance after launch",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
      </>
    ),
  },
];

export default function WebDesignTrustBar() {
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
