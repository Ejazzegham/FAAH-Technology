import Image from "next/image";
import Link from "next/link";

const HIGHLIGHTS = [
  "15+ Years of Experience",
  "Fast & Reliable Support",
  "2000+ Projects Completed",
  "Clean & Efficient Code",
  "1330+ Happy Clients",
  "100% Client Satisfaction",
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="rgb-box relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-bg-card to-bg">
          <Image
            src="/team/founder-portrait.png"
            alt="Ejaz Zegham — FAAH Technology"
            width={900}
            height={1125}
            className="absolute inset-0 h-full w-full object-cover object-top"
            priority
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-6 top-10 h-24 w-1 rotate-12 bg-gold-gradient"
          />
        </div>

        <div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
            <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
            ABOUT ME
            <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-snug text-white sm:text-4xl">
            Passionate about design and code.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            I&apos;m a Graphic Designer &amp; Full Stack Developer with a
            passion for creating beautiful and powerful digital experiences.
            I believe in clean code, great design, and enhancing user
            experiences.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gold">
                  <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" />
                  <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <Link href="/about" className="btn-outline mt-8">
            LEARN MORE
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
