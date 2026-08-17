import Image from "next/image";
import Lightfall from "./Lightfall";

const CHECKLIST = [
  "Responsive & Mobile-Friendly Websites",
  "Custom Web Applications & Dashboards",
  "SEO-Optimized & High-Performance Development",
  "Secure, Scalable & Future-Ready Solutions",
];

export default function WebDesignHero() {
  return (
    <section id="web-design-hero" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
        <Lightfall
          colors={["#A6C8FF", "#5227FF", "#FF9FFC"]}
          backgroundColor="#0A29FF"
          speed={0.5}
          streakCount={2}
          streakWidth={1}
          streakLength={1}
          glow={1}
          density={0.6}
          twinkle={1}
          zoom={3}
          backgroundGlow={0.5}
          opacity={1}
          mouseInteraction
          mouseStrength={0.5}
          mouseRadius={1}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="section relative z-10 grid items-center gap-12 pb-10 pt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-12">
        <div className="text-center lg:text-left">
          <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold lg:justify-start">
            <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
            OUR SERVICES
            <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
          </p>

          <h1 className="mx-auto mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.15] sm:text-4xl lg:mx-0 lg:text-5xl">
            <span className="text-white">Web Design</span>
            <br />
            <span className="rgb-text tracking-tight">&amp; Development</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm font-semibold tracking-wide text-white/80 sm:text-base lg:mx-0">
            Modern Websites Built for Performance &amp; Growth
          </p>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted lg:mx-0">
            At FAAH Technology, we design and develop fast, secure, and
            responsive websites tailored to your business goals. From
            corporate websites and eCommerce stores to custom web
            applications and admin dashboards, we build scalable digital
            solutions that deliver outstanding user experiences and drive
            business growth.
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
            src="/web-design/hero.png"
            alt="FAAH Technology web design and development workspace showing code, wireframes, and website mockups"
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
