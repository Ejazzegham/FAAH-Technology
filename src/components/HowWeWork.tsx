const STEPS = [
  {
    title: "Discuss",
    desc: "Share your ideas and requirements",
    icon: <path d="M4 5h16v11H8l-4 4V5z" />,
  },
  {
    title: "Research",
    desc: "We research your industry & competitors",
    icon: <path d="M6 4h9l3 3v13H6V4zM9 9h6M9 13h6M9 17h3" />,
  },
  {
    title: "Design",
    desc: "We create initial concepts for you",
    icon: <path d="M4 20l1-4L15.5 5.5a1.5 1.5 0 012 2L7 17l-3 3zM13.5 7.5l3 3" />,
  },
  {
    title: "Review",
    desc: "You review and share feedback",
    icon: <path d="M9 12l2 2 4-4M21 12a9 9 0 11-9-9 9 9 0 019 9z" />,
  },
  {
    title: "Refine",
    desc: "We refine the design until perfection",
    icon: <path d="M3 12a9 9 0 0115.4-6.4M21 12a9 9 0 01-15.4 6.4M17 3v5h-5M7 21v-5h5" />,
  },
  {
    title: "Deliver",
    desc: "Final files delivered on time",
    icon: <path d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M9 12.5l3 1.3 3-1.3" />,
  },
];

export default function HowWeWork() {
  return (
    <section className="section pt-0 pb-0 text-center">
      <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
        <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
        OUR PROCESS
        <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
        How We Work
      </h2>

      <div className="relative mt-14 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
        <div
          aria-hidden
          className="absolute left-0 right-0 top-9 hidden border-t border-dashed border-gold/30 lg:block"
        />
        {STEPS.map((step, i) => (
          <div key={step.title} className="relative flex flex-col items-center gap-3">
            <span className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-gold/50 bg-bg text-gold">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {step.icon}
              </svg>
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-bg">
                {i + 1}
              </span>
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{step.title}</p>
              <p className="mx-auto mt-1 max-w-[9rem] text-[11px] leading-snug text-muted">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
