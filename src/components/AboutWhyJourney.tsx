import { Users, Settings2, ShieldCheck, Headphones, Clock, Gem } from "lucide-react";

const WHY_US = [
  {
    icon: Users,
    title: "Experienced Professionals",
    text: "Our skilled team brings years of experience in graphic design, web development, mobile apps, and custom software solutions.",
  },
  {
    icon: Settings2,
    title: "Custom-Tailored Solutions",
    text: "Every project is designed specifically for your business goals, brand identity, and operational requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Reliability",
    text: "We focus on clean design, secure development, optimized performance, and reliable long-term results.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    text: "Our team stays available before, during, and after project completion to ensure a smooth experience.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    text: "We respect deadlines and deliver projects efficiently without compromising quality.",
  },
  {
    icon: Gem,
    title: "Affordable Premium Service",
    text: "Get high-quality design and development solutions at competitive pricing that delivers real business value.",
  },
];

const JOURNEY = [
  {
    year: "2010",
    title: "The Beginning",
    text: "FAAH Technology was founded with a vision to blend design and technology.",
    icon: (
      <>
        <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.5 9.4l6.6-.9L12 2.5z" />
      </>
    ),
  },
  {
    year: "2014",
    title: "Building Momentum",
    text: "Grew a dedicated team and delivered our first flagship digital products.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6M16 8a3 3 0 110-6M22 20c0-2.7-2-5-5-5.8" />
      </>
    ),
  },
  {
    year: "2018",
    title: "Going Global",
    text: "Expanded beyond borders, serving clients across multiple countries.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
      </>
    ),
  },
  {
    year: "2022",
    title: "Full-Scale Studio",
    text: "Matured into a full-service agency spanning design, web and software.",
    icon: (
      <>
        <path d="M4 20l4-9 4 5 4-8 4 12H4z" />
      </>
    ),
  },
  {
    year: "2026",
    title: "Onward & Upward",
    text: "Continuing to innovate, craft and grow alongside every client we serve.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
  },
];

export default function AboutWhyJourney() {
  return (
    <section className="section pt-0 flex flex-col gap-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
          <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
          WHY CHOOSE US
          <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
          We Build Solutions, <span className="text-gold">We Build Trust.</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          At FAAH Technology, we combine creativity, technology, and strategy to deliver
          digital solutions that help your business grow, stand out, and succeed in the
          modern digital world.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
        {WHY_US.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gold/40 text-gold">
              <Icon size={20} strokeWidth={1.6} />
            </span>
            <div>
              <h3 className="font-display text-sm font-semibold text-gold">{title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
          <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
          OUR JOURNEY
          <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
        </p>
        <h2 className="mt-3 text-center font-display text-2xl font-semibold text-white sm:text-3xl">
          A Decade &amp; Beyond, Since 2010
        </h2>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="timeline-line absolute left-6 top-0 bottom-0 w-px lg:left-0 lg:right-0 lg:top-6 lg:h-px lg:w-auto lg:bottom-auto"
          />

          <div className="flex flex-col gap-10 pl-16 lg:grid lg:grid-cols-5 lg:gap-6 lg:pl-0">
            {JOURNEY.map((step, index) => (
              <div
                key={step.year}
                className={`relative flex flex-col items-start lg:items-center lg:text-center ${
                  index % 2 === 1 ? "lg:mt-16" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="absolute -left-16 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-bg text-gold shadow-gold lg:static lg:mb-4"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {step.icon}
                  </svg>
                </span>

                <div
                  className="rgb-box w-full rounded-xl px-5 py-5 lg:py-6"
                  style={{ ["--box-fill" as string]: "#131318" }}
                >
                  <p className="font-display text-xl font-bold text-gold">{step.year}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
