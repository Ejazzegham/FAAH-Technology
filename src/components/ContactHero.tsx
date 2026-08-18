import Image from "next/image";

const CHECKLIST = [
  "Free Project Consultation",
  "Fast & Friendly Communication",
  "Custom Solutions for Your Business",
  "Reliable Support from Start to Finish",
];

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="section grid items-center gap-12 pb-10 pt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-12">
        <div className="text-center lg:text-left">
          <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold lg:justify-start">
            <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
            GET IN TOUCH
            <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
          </p>

          <h1 className="mx-auto mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.15] sm:text-4xl lg:mx-0 lg:text-5xl">
            <span className="text-ink">Contact</span>
            <br />
            <span className="text-gold tracking-tight">FAAH Technology</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm font-semibold tracking-wide text-ink/80 sm:text-base lg:mx-0">
            Let&apos;s Build Something Extraordinary Together
          </p>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted lg:mx-0">
            Have a project in mind or need expert digital solutions?
            We&apos;re here to help. Whether you need creative branding, a
            modern website, a mobile app, or custom software, our team is
            ready to turn your ideas into powerful, results-driven
            solutions.
          </p>

          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:mx-0 lg:justify-start">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-ink/90">
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
            src="/contact/hero.png"
            alt="FAAH Technology contact — desk scene with a laptop showing a message form, surrounded by icons for quick response, live support, trust and reliability, email, phone, and location"
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
