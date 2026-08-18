const BADGES = [
  {
    title: "UI/UX Design",
    desc: "Intuitive interfaces for every user",
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </>
    ),
  },
  {
    title: "Application Architecture",
    desc: "Solid foundations that scale",
    icon: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </>
    ),
  },
  {
    title: "Clean Code",
    desc: "Maintainable, well-structured builds",
    icon: <path d="M8 6l-5 6 5 6M16 6l5 6-5 6M13 4l-2 16" />,
  },
  {
    title: "High Performance",
    desc: "Fast, responsive, resource-efficient",
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  },
  {
    title: "Secure Applications",
    desc: "Encryption, roles & access control",
    icon: (
      <>
        <path d="M12 2l8 3v6c0 5-3.4 8.6-8 11-4.6-2.4-8-6-8-11V5l8-3z" />
        <path d="M9.5 12l1.8 1.8 3.2-4" />
      </>
    ),
  },
  {
    title: "Support & Maintenance",
    desc: "We're here after launch too",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
      </>
    ),
  },
];

export default function DesktopSoftwareTrustBar() {
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
              <p className="text-xs font-semibold text-ink">{b.title}</p>
              <p className="text-[11px] text-muted">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
