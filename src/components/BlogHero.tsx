import Image from "next/image";

const CHECKLIST = [
  "Expert Tips & Tutorials",
  "Latest Industry Trends",
  "Real Case Studies",
];

export default function BlogHero() {
  return (
    <section className="relative flex min-h-[480px] items-center overflow-hidden lg:min-h-[600px]">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/blog/hero-glow.png"
          alt="Laptop displaying the FAAH Technology blog with trending posts on technology, design, and digital marketing"
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
            OUR BLOG
            <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
          </p>

          <h1 className="mx-auto mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.15] sm:text-4xl lg:mx-0 lg:text-5xl">
            <span className="text-white">Insights That</span>
            <br />
            <span className="text-gold tracking-tight">Drive Innovation</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm font-semibold tracking-wide text-white/80 sm:text-base lg:mx-0">
            Ideas. Trends. Real-World Impact.
          </p>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/60 lg:mx-0">
            Explore the latest in web design, development, and digital
            marketing from our team of experts.
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
