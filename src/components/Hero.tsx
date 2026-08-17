import Image from "next/image";

const CHECKLIST = [
  "Creative & Modern UI/UX Design",
  "Responsive Websites & Web Applications",
  "Mobile Apps & Custom Software",
  "Clean, Secure & Scalable Code",
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="section grid items-center gap-12 pb-10 pt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-12">
        <div className="text-center lg:text-left">
          <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold lg:justify-start">
            <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
            HELLO, WE&apos;RE
            <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
          </p>

          <h1 className="mx-auto mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.15] sm:text-4xl lg:mx-0 lg:text-5xl">
            <span className="text-white">Welcome to</span>
            <br />
            <span className="text-gold tracking-tight">FAAH Technology</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm font-semibold tracking-wide text-white/80 sm:text-base lg:mx-0">
            Creative Design. Clean Code. Real Results.
          </p>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted lg:mx-0">
            We help businesses, startups, and brands grow with creative
            design, modern websites, powerful mobile apps, and custom
            software solutions. Our focus is on delivering innovative
            digital experiences that drive real business results.
          </p>

          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:mx-0 lg:justify-start">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/90">
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
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rgb-box relative mx-auto aspect-[16/9] w-full max-w-xl overflow-hidden rounded-2xl">
          <Image
            src="/home/hero.png"
            alt="FAAH Technology emblem set against a global digital network, representing worldwide reach and technology-driven growth"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
