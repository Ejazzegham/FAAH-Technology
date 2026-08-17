import Image from "next/image";

const CHECKLIST = [
  "Creative & Modern UI/UX Design",
  "Responsive Websites & Web Applications",
  "Mobile Apps & Custom Software",
  "Clean, Secure & Scalable Code",
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[560px] overflow-hidden lg:min-h-[680px]">
      {/* Full-bleed artwork — spans the entire section width, not boxed or
          cropped to a card. Its own background is already near-black, so it
          blends straight into the page instead of sitting in a frame. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/home/hero-glow.png"
          alt="FAAH Technology emblem glowing in blue, set on a dark futuristic stage, representing innovation and technology-driven growth"
          fill
          className="object-cover object-[78%_center] lg:object-[70%_center]"
          sizes="100vw"
          priority
        />
        {/* Legibility gradient: solid over the text on the left, fading out
            toward the emblem on the right so the artwork stays untouched. */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
      </div>

      <div className="section relative flex min-h-[560px] items-center py-24 lg:min-h-[680px] lg:py-32">
        <div className="max-w-xl text-center lg:text-left">
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
      </div>
    </section>
  );
}
