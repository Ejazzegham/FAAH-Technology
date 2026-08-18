"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What do I need to get started?",
    a: "Just a clear idea of your project and any brand assets you already have (logo, colors, fonts). We'll guide you through everything else during the discovery call.",
  },
  {
    q: "How long does it take to complete a logo?",
    a: "Most logo packages are delivered within 2–4 days depending on the tier you choose. Rush delivery is available on request.",
  },
  {
    q: "How many revisions do you offer?",
    a: "It depends on the package — Starter includes a set number of revisions, while Professional tiers and above include unlimited revisions until you're happy.",
  },
  {
    q: "Do you provide copyright ownership?",
    a: "Yes. Once your project is delivered and paid in full, you receive full copyright ownership of the final files.",
  },
  {
    q: "What files will I receive?",
    a: "You'll get source files plus web-ready formats (PNG, JPG, SVG, PDF) depending on the package, so you're covered for print and digital use.",
  },
  {
    q: "Can I upgrade my package later?",
    a: "Absolutely — you can upgrade to a higher tier at any time and we'll only charge the price difference.",
  },
];

export default function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section text-center">
      <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
        <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
        FREQUENTLY ASKED QUESTIONS
        <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
        Need Help? We&apos;ve Got Answers
      </h2>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={faq.q}
              className="rgb-box rounded-lg"
              style={{ ["--box-fill" as string]: "#ffffff" }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-ink"
                aria-expanded={isOpen}
              >
                {faq.q}
                <span
                  aria-hidden
                  className={`shrink-0 text-lg text-gold transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <p className="px-5 pb-4 text-xs leading-relaxed text-muted">{faq.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
