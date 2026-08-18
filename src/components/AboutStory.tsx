const CORE_VALUES = [
  "Client-First Approach",
  "100% Client Satisfaction",
  "Fast & Responsive Communication",
  "On-Time Project Delivery",
  "Premium & Modern Design",
  "Clean, Scalable & Secure Development",
  "Honest & Transparent Collaboration",
  "Long-Term Technical Support",
];

export default function AboutStory() {
  return (
    <section className="section pt-0">
      <div className="mx-auto max-w-3xl text-center">
        <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
          <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
          WHO WE ARE
          <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
          About <span className="text-gold">FAAH Technology</span>
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
        {/* Core Values — left column */}
        <div className="rgb-box flex flex-col rounded-2xl p-8 lg:p-10"
          style={{ ["--box-fill" as string]: "#ffffff" }}>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
            <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
            CORE VALUES
            <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
            What We <span className="text-gold">Stand For</span>
          </h3>

          <ul className="mt-8 space-y-4">
            {CORE_VALUES.map((value) => (
              <li
                key={value}
                className="rgb-box flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-ink/90"
                style={{ ["--box-fill" as string]: "#ffffff" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gold">
                  <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" />
                  <path
                    d="M8 12.5l2.5 2.5L16 9"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {value}
              </li>
            ))}
          </ul>
        </div>

        {/* About paragraph — right column */}
        <div className="rgb-box flex flex-col rounded-2xl p-8 lg:p-10"
          style={{ ["--box-fill" as string]: "#ffffff" }}>
          <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            About <span className="text-gold">Us</span>
          </h3>

          <div className="mt-6 flex flex-1 flex-col justify-between gap-4 text-base leading-relaxed text-muted">
            <p>
              At FAAH Technology, we create innovative digital solutions that
              combine creativity with reliable technology. Our goal is to help
              businesses, startups, and entrepreneurs build a strong digital
              presence with high-quality, results-driven services.
            </p>
            <p>
              We specialize in Graphic Design, Website Design &amp;
              Development, Mobile App Development, and Custom Desktop
              Software. From building a professional brand identity to
              developing powerful business applications, we deliver solutions
              tailored to your goals.
            </p>
            <p>
              Our clients are at the center of everything we do. We focus on
              clear communication, attention to detail, timely delivery, and
              dependable support to ensure every project exceeds expectations.
            </p>
            <p>
              At FAAH Technology, we don&apos;t just design and develop—we
              create digital experiences that help businesses grow, strengthen
              their brand, and achieve lasting success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
