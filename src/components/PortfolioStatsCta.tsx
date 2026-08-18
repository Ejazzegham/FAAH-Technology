import LetsTalkButton from "./LetsTalkButton";

const STATS = [
  {
    label: "PROJECTS COMPLETED",
    value: "2000+",
    icon: <path d="M12 2l7 4v6c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V6l7-4z" />,
  },
  {
    label: "HAPPY CLIENTS",
    value: "1330+",
    icon: <path d="M17 20v-1a4 4 0 00-3-3.87M7 20v-1a4 4 0 013-3.87M13 7a3 3 0 11-6 0 3 3 0 016 0zM21 20v-1a4 4 0 00-3-3.16M15.5 3.5a3 3 0 010 5.66" />,
  },
  {
    label: "YEARS EXPERIENCE",
    value: "15+",
    icon: <path d="M12 8v4l2.5 2.5M12 3a9 9 0 100 18 9 9 0 000-18z" />,
  },
  {
    label: "CLIENT SATISFACTION",
    value: "100%",
    icon: <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM9 10h.01M15 10h.01M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8" />,
  },
];

export default function PortfolioStatsCta() {
  return (
    <div className="section pt-0">
      <div className="rgb-box grid grid-cols-2 gap-8 rounded-xl px-8 py-10 sm:grid-cols-4" style={{ ["--box-fill" as string]: "#ffffff" }}>
        {STATS.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {stat.icon}
              </svg>
            </span>
            <div>
              <p className="font-display text-xl font-bold text-ink">{stat.value}</p>
              <p className="text-[10px] font-medium tracking-wide text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rgb-box relative mt-8 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-xl px-8 py-10 sm:flex-row" style={{ ["--box-fill" as string]: "#ffffff" }}>
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl"
        />
        <div className="relative">
          <h3 className="font-display text-2xl font-semibold text-ink">
            Have a Project in Mind? <span className="text-gold">Let&apos;s Talk.</span>
          </h3>
          <p className="mt-2 text-sm text-muted">
            Share your vision with us, and we&apos;ll help you bring it to life with creative technology solutions.
          </p>
        </div>
        <LetsTalkButton wrapperClassName="relative shrink-0" />
      </div>
    </div>
  );
}
