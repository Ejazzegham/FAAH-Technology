const BADGES = [
  {
    title: "Native & Cross-Platform",
    desc: "iOS, Android, Flutter & React Native",
    icon: <rect x="7" y="2" width="10" height="20" rx="2" />,
  },
  {
    title: "Secure by Design",
    desc: "Encrypted data & secure authentication",
    icon: (
      <>
        <path d="M12 2l8 3v6c0 5-3.4 8.6-8 11-4.6-2.4-8-6-8-11V5l8-3z" />
        <path d="M9.5 12l1.8 1.8 3.2-4" />
      </>
    ),
  },
  {
    title: "App Store & Play Store",
    desc: "We handle the full submission process",
    icon: (
      <>
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </>
    ),
  },
  {
    title: "Built to Scale",
    desc: "Grows with your users & features",
    icon: <path d="M3 12a9 9 0 0115.4-6.4M21 12a9 9 0 01-15.4 6.4M17 3v5h-5M7 21v-5h5" />,
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

export default function MobileAppTrustBar() {
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
