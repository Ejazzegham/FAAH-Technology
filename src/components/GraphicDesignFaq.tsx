"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What graphic design services do you offer?",
    a: "We offer Logo Design, Brand Identity, Business Cards, Flyers, Brochures, Posters, Social Media Designs, Packaging, Banners, Book Covers, UI Design, T-Shirt Designs, and much more.",
  },
  {
    q: "Why is graphic design important for my business?",
    a: "Professional graphic design builds trust, improves brand recognition, attracts customers, and helps your business stand out from competitors.",
  },
  {
    q: "Do you create custom designs?",
    a: "Yes. Every design is created from scratch according to your business, brand identity, and target audience.",
  },
  {
    q: "Do I own the copyright after delivery?",
    a: "Yes. Once the project is completed and payment is made, you receive full ownership of the final approved design unless otherwise agreed.",
  },
  {
    q: "What file formats will I receive?",
    a: "You'll receive high-quality files including AI, PSD, EPS, SVG, PDF, PNG, JPG, CDR, or any other format you need — depending on your selected package.",
  },
  {
    q: "Can you redesign my existing logo?",
    a: "Absolutely. We can modernize your current logo while maintaining your brand identity.",
  },
  {
    q: "Do you provide unlimited revisions?",
    a: "Yes. We offer revisions until you're satisfied, within the agreed project scope.",
  },
  {
    q: "What information do you need to start?",
    a: "We typically need your company name, business description, preferred colors, style preferences, sample inspirations (optional), and required dimensions.",
  },
  {
    q: "Can you design for both print and digital use?",
    a: "Yes. All designs are optimized for both digital platforms and professional printing.",
  },
  {
    q: "Do you create complete brand identities?",
    a: "Yes. We design complete branding packages including logos, business cards, letterheads, social media kits, brand guidelines, and more.",
  },
  {
    q: "Do you design social media graphics?",
    a: "Yes. We create professional graphics for Facebook, Instagram, LinkedIn, YouTube, TikTok, X (Twitter), and other platforms.",
  },
  {
    q: "Can you create marketing materials?",
    a: "Yes. We design flyers, brochures, banners, posters, catalogs, menus, packaging, and promotional materials.",
  },
  {
    q: "Do you provide source files?",
    a: "Yes. Editable source files are included upon request or according to your selected package.",
  },
  {
    q: "Do you offer rush delivery?",
    a: "Yes. Express delivery is available for urgent projects.",
  },
  {
    q: "How do we communicate during the project?",
    a: "We provide regular updates via email, WhatsApp, Zoom, Google Meet, or your preferred communication platform.",
  },
  {
    q: "Do you offer ongoing design support?",
    a: "Yes. We provide long-term graphic design support for businesses that need regular updates and marketing materials.",
  },
  {
    q: "Why should I choose FAAH Technology?",
    a: "We combine creativity, modern design trends, and strategic thinking to deliver premium-quality designs that strengthen your brand. We focus on originality, fast communication, timely delivery, and complete client satisfaction.",
  },
  {
    q: "Do you sign NDA agreements?",
    a: "Yes. We respect client confidentiality and are happy to sign a Non-Disclosure Agreement (NDA) if required.",
  },
  {
    q: "Do you provide lifetime support?",
    a: "We provide ongoing support and future updates whenever you need additional design work or modifications.",
  },
  {
    q: "What is your refund policy?",
    a: "Client satisfaction is important to us. If work hasn't started, you may be eligible for a full or partial refund. Once project work has begun, refunds are generally not available since our team has already invested time and resources — we encourage open communication and offer revisions within the agreed scope instead.",
  },
  {
    q: "Can I cancel my project after it has started?",
    a: "Yes, you may cancel at any time. However, you'll be responsible for payment for work completed up to the cancellation date, and any remaining unpaid balance for that work will still be due.",
  },
];

export default function GraphicDesignFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section text-center">
      <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
        <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
        FREQUENTLY ASKED QUESTIONS
        <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
        Got Questions? We&apos;ve Got Answers
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
        Everything you need to know before starting your graphic design
        project with FAAH Technology.
      </p>

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
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
                <p className="px-5 pb-4 text-xs leading-relaxed text-muted">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
