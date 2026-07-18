const REASONS = [
  {
    title: "Quick Response",
    desc: "We reply within 24 hours to all inquiries.",
    icon: <path d="M4 4h16v11H8l-4 4V4z" />,
  },
  {
    title: "Expert Team",
    desc: "Work with experienced professionals.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6M16 8a3 3 0 110-6M22 20c0-2.7-2-5-5-5.8" />
      </>
    ),
  },
  {
    title: "Tailored Solutions",
    desc: "We provide solutions designed for your needs.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      </>
    ),
  },
  {
    title: "100% Secure",
    desc: "Your information is safe and confidential.",
    icon: <path d="M12 2l8 3v6c0 5-3.4 8.6-8 11-4.6-2.4-8-6-8-11V5l8-3zM9.5 12l1.8 1.8 3.2-4" />,
  },
  {
    title: "Long Term Support",
    desc: "We're with you even after project delivery.",
    icon: <path d="M8 12l2.5 2.5L14 10M9 4l1.5 1.5L14 2M2 15l2.5 2.5L8 14" />,
  },
];

export default function ContactWhyReach() {
  return (
    <section className="section pt-0 text-center">
      <div className="rgb-box rounded-xl px-8 py-12" style={{ ["--box-fill" as string]: "#0f0f13" }}>
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          Why Get <span className="text-gold">In Touch</span> With Us?
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {REASONS.map((r) => (
            <div key={r.title} className="flex flex-col items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-gold/40 text-gold">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {r.icon}
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-gold">{r.title}</p>
                <p className="mt-1 text-[11px] leading-snug text-muted">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
