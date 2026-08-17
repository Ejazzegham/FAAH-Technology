import {
  Palette,
  Globe,
  Smartphone,
  Monitor,
  Megaphone,
  PenTool,
  Cpu,
  TrendingUp,
  Terminal,
  Gauge,
} from "lucide-react";

const TOPICS = [
  { icon: Palette, label: "Graphic Design Tips & Inspiration" },
  { icon: Globe, label: "Website Design & Development" },
  { icon: Smartphone, label: "Mobile App Design & Development" },
  { icon: Monitor, label: "Custom Desktop Software Solutions" },
  { icon: Megaphone, label: "Branding & Marketing Strategies" },
  { icon: PenTool, label: "UI/UX Design Best Practices" },
  { icon: Cpu, label: "AI & Emerging Technologies" },
  { icon: TrendingUp, label: "Business Growth & Digital Transformation" },
  { icon: Terminal, label: "Development Tutorials & Coding Tips" },
  { icon: Gauge, label: "SEO, Performance & Optimization" },
];

export default function BlogAbout() {
  return (
    <section className="section pt-0">
      <div className="mx-auto max-w-3xl text-center">
        <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
          <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
          WHAT WE WRITE ABOUT
          <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
          About Our <span className="text-gold">Blog</span>
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
        {/* Blog paragraph — left column */}
        <div className="rgb-box flex flex-col rounded-2xl p-8 lg:p-10"
          style={{ ["--box-fill" as string]: "#0e0e11" }}>
          <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Stay Ahead with the Latest in <span className="text-gold">Design &amp; Technology</span>
          </h3>

          <div className="mt-6 flex flex-1 flex-col justify-between gap-4 text-base leading-relaxed text-muted">
            <p>
              The FAAH Technology Blog is a dedicated platform created to share
              valuable knowledge, industry insights, and practical resources
              for businesses, entrepreneurs, designers, developers, and
              technology enthusiasts. Our mission is to simplify complex
              digital concepts and provide actionable information that helps
              readers stay informed, make better decisions, and succeed in an
              increasingly technology-driven world.
            </p>
            <p>
              Through expertly written articles, in-depth guides, tutorials,
              case studies, and industry updates, we explore a wide range of
              topics including Graphic Design, Branding, Web Design, Web
              Development, Mobile Application Development, UI/UX Design,
              Digital Marketing, Artificial Intelligence (AI), Automation,
              Cloud Technologies, Software Development, and emerging digital
              trends. Whether you&apos;re looking to improve your brand
              identity, build a better website, streamline business
              operations, or understand the latest innovations in technology,
              our content is designed to provide real value.
            </p>
            <p>
              At FAAH Technology, we believe that continuous learning is the
              foundation of innovation and growth. That&apos;s why every
              article is carefully researched, professionally written, and
              focused on delivering clear, practical, and easy-to-understand
              information. Our goal is not only to share knowledge but also to
              inspire creativity, encourage innovation, and empower our
              readers with the skills and insights needed to thrive in the
              modern digital landscape.
            </p>
            <p>
              From beginners seeking guidance to experienced professionals
              looking for advanced strategies, the FAAH Technology Blog serves
              as a trusted resource for staying ahead of industry trends,
              discovering new opportunities, and building a stronger future
              through technology.
            </p>
          </div>
        </div>

        {/* Explore Topics — right column */}
        <div className="rgb-box flex flex-col rounded-2xl p-8 lg:p-10"
          style={{ ["--box-fill" as string]: "#0e0e11" }}>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
            <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
            EXPLORE TOPICS
            <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
            What You&apos;ll <span className="text-gold">Discover</span>
          </h3>

          <ul className="mt-8 flex flex-1 flex-col justify-between gap-3">
            {TOPICS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="rgb-box flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/90"
                style={{ ["--box-fill" as string]: "#131318" }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/40 text-gold">
                  <Icon size={16} strokeWidth={1.6} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
