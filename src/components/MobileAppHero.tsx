import Image from "next/image";

const CHECKLIST = [
  "Native & Cross-Platform",
  "Seamless User Experience",
  "Ongoing Support & Updates",
];

export default function MobileAppHero() {
  return (
    <section
      id="mobile-app-hero"
      className="relative flex min-h-[480px] items-center overflow-hidden lg:min-h-[600px]"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/mobile-app/hero-glow.png"
          alt="Glowing digital globe surrounded by icons for code, mobile, cloud, security, analytics, and support, representing FAAH Technology's mobile app development services"
          fill
          className="object-cover object-[75%_center] lg:object-[65%_center]"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04060f] via-[#04060f]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060f] via-transparent to-transparent" />
      </div>

      <div className="section relative w-full">
        <div className="max-w-xl text-center lg:text-left">
          <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold lg:justify-start">
            <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
            OUR SERVICES
            <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
          </p>

          <h1 className="mx-auto mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.15] sm:text-4xl lg:mx-0 lg:text-5xl">
            <span className="text-white">Apps Built for</span>
            <br />
            <span className="text-gold tracking-tight">iOS &amp; Android</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm font-semibold tracking-wide text-white/80 sm:text-base lg:mx-0">
            Powerful. Intuitive. Reliable.
          </p>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/60 lg:mx-0">
            From concept to launch, we build high-performance mobile apps
            that your users will love to use.
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
      </div>
    </section>
  );
}
