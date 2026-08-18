"use client";

import { useEffect, useState } from "react";
import { DEFAULT_SETTINGS, subscribeSettings } from "@/lib/firestore/settings";

const LABELS = [
  { name: "Sheikhupura", top: "18%", left: "10%" },
  { name: "Nankana Sahib", top: "42%", left: "6%" },
  { name: "Safdarabad", top: "70%", left: "8%" },
  { name: "Muridke", top: "20%", left: "32%" },
  { name: "Hafizabad", top: "10%", left: "62%" },
  { name: "Chiniot", top: "20%", left: "72%" },
  { name: "Jaranwala", top: "36%", left: "72%" },
  { name: "Toba Tek Singh", top: "58%", left: "60%" },
  { name: "Faisalabad", top: "68%", left: "52%" },
  { name: "Lahore", top: "80%", left: "44%" },
];

export default function ContactMap() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    const unsub = subscribeSettings(setSettings);
    return () => unsub?.();
  }, []);

  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    settings.address
  )}`;
  const pinLabel = settings.address.split(",")[0]?.trim() || settings.address;

  return (
    <section className="section pt-0">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
        {/* Let's Talk / Contact Us — left column */}
        <div className="rgb-box flex flex-col rounded-2xl p-8 lg:p-10"
          style={{ ["--box-fill" as string]: "#ffffff" }}>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
            <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
            LET&apos;S TALK
            <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
            Contact <span className="text-gold">Us</span>
          </h2>
          <p className="mt-4 font-display text-lg font-semibold text-ink/90 sm:text-xl">
            Let&apos;s Build Something Exceptional Together
          </p>

          <div className="mt-6 flex flex-1 flex-col justify-between gap-4 text-base leading-relaxed text-muted">
            <p>
              At FAAH Technology, we believe every successful project begins
              with a meaningful conversation. Whether you&apos;re launching a
              new business, expanding your digital presence, or transforming
              an existing brand, our team is ready to help bring your vision
              to life with innovative, high-quality digital solutions
              tailored to your unique goals.
            </p>
            <p>
              We specialize in Graphic Design, Branding, Website Development,
              E-Commerce Solutions, Mobile App Development, UI/UX Design, and
              Custom Software Development, delivering solutions that combine
              creativity, functionality, and long-term business value. Our
              approach focuses on understanding your requirements,
              identifying opportunities, and creating results-driven products
              that help your business stand out in a competitive market.
            </p>
            <p>
              From concept and strategy to design, development, and ongoing
              support, we work closely with our clients throughout every
              stage of the project. We prioritize clear communication,
              transparency, reliability, and timely delivery to ensure a
              smooth and successful experience from start to finish.
            </p>
            <p>
              No matter the size or complexity of your project, our goal
              remains the same: to provide professional digital solutions
              that strengthen your brand, improve customer engagement,
              streamline operations, and support sustainable business growth.
            </p>
          </div>
        </div>

        {/* Our Location + map — right column, stacked */}
        <div className="flex flex-col gap-8">
          <div className="rgb-box flex flex-col rounded-2xl p-8 lg:p-10"
          style={{ ["--box-fill" as string]: "#ffffff" }}>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
              <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
              OUR LOCATION
              <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Visit Our Office
              <br />
              We&apos;d Love to <span className="text-gold">Meet You</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              We are always open to discussing new ideas, creative projects or opportunities to
              be a part of your visions. Feel free to visit our office.
            </p>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-7 self-start"
            >
              GET DIRECTIONS
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 22s7-6.3 7-12a7 7 0 10-14 0c0 5.7 7 12 7 12z" />
                <circle cx="12" cy="10" r="2.4" />
              </svg>
            </a>
          </div>

          <div className="rgb-box relative aspect-[4/3] overflow-hidden rounded-xl bg-bg-card">
            <svg
              className="absolute inset-0 h-full w-full opacity-40"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={i * 34}
                  y1="0"
                  x2={i * 34}
                  y2="300"
                  stroke="#3a3a42"
                  strokeWidth="1"
                />
              ))}
              {Array.from({ length: 9 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="0"
                  y1={i * 34}
                  x2="400"
                  y2={i * 34}
                  stroke="#3a3a42"
                  strokeWidth="1"
                />
              ))}
            </svg>

            {LABELS.map((l) => (
              <span
                key={l.name}
                className="absolute text-[10px] text-muted"
                style={{ top: l.top, left: l.left }}
              >
                {l.name}
              </span>
            ))}

            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-gold">
                <path
                  d="M12 22s7-6.3 7-12a7 7 0 10-14 0c0 5.7 7 12 7 12z"
                  fill="currentColor"
                  fillOpacity="0.25"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="12" cy="10" r="2.4" fill="currentColor" />
              </svg>
              <span className="mt-1 rounded bg-bg/80 px-2 py-0.5 text-xs font-semibold text-ink">
                {pinLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
