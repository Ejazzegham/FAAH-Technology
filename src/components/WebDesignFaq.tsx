"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What website development services do you offer?",
    a: "We provide complete website design and development services, including business websites, corporate websites, eCommerce stores, landing pages, portfolio websites, custom web applications, admin dashboards, CMS solutions, and responsive web design.",
  },
  {
    q: "Do you build custom websites?",
    a: "Yes. Every website is designed and developed from scratch based on your business goals, branding, and functionality requirements.",
  },
  {
    q: "Will my website be mobile-friendly?",
    a: "Absolutely. Every website we build is fully responsive and optimized for desktops, tablets, and smartphones.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes. We can redesign outdated websites with a modern interface, improved performance, better user experience, and updated functionality.",
  },
  {
    q: "Which technologies do you use?",
    a: "We work with modern technologies including HTML5, CSS3, JavaScript, React.js, Next.js, Vite, Node.js, Express.js, PHP, Laravel, Firebase, MongoDB, MySQL, PostgreSQL, Tailwind CSS, Bootstrap, and WordPress.",
  },
  {
    q: "Will my website be SEO-friendly?",
    a: "Yes. Every website follows SEO best practices, including clean code, fast loading speed, mobile responsiveness, proper headings, metadata, and optimized structure.",
  },
  {
    q: "Do you provide hosting and domain setup?",
    a: "Yes. We can assist with domain registration, web hosting, SSL certificates, business email setup, and website deployment.",
  },
  {
    q: "Do you provide website maintenance?",
    a: "Yes. We offer ongoing maintenance, security updates, backups, bug fixes, and feature enhancements after your website is launched.",
  },
  {
    q: "Can you integrate payment gateways?",
    a: "Yes. We integrate secure payment solutions including Stripe, PayPal, Razorpay, Square, and many other payment providers.",
  },
  {
    q: "Can you integrate third-party APIs?",
    a: "Yes. We integrate APIs such as Google Maps, Firebase, payment gateways, shipping services, SMS, email, social media, AI services, and more.",
  },
  {
    q: "Will my website be secure?",
    a: "Yes. We implement security best practices including SSL encryption, secure authentication, input validation, backups, and protection against common web vulnerabilities.",
  },
  {
    q: "Can you build custom web applications?",
    a: "Yes. We develop custom CRM systems, ERP solutions, inventory systems, POS systems, hospital management systems, school management systems, booking systems, and other business applications.",
  },
  {
    q: "Can you make my website multilingual?",
    a: "Yes. We can build websites that support multiple languages to help you reach a wider audience.",
  },
  {
    q: "Do you optimize websites for Google?",
    a: "Yes. We implement technical SEO, structured layouts, fast loading speeds, mobile optimization, and clean coding practices to improve search engine visibility.",
  },
  {
    q: "Can you connect my website to a database?",
    a: "Yes. We work with MySQL, PostgreSQL, MongoDB, Firebase, SQLite, and other databases to build dynamic, data-driven websites.",
  },
  {
    q: "Can you convert my design into a website?",
    a: "Yes. We can convert Figma, Adobe XD, Photoshop (PSD), or other UI designs into fully responsive, functional websites.",
  },
  {
    q: "Why should I choose HZ Technology?",
    a: "We combine creativity, modern design trends, and strategic thinking to deliver premium-quality websites that strengthen your brand. We focus on originality, fast communication, timely delivery, and complete client satisfaction.",
  },
  {
    q: "Do you sign NDA agreements?",
    a: "Yes. We respect client confidentiality and are happy to sign a Non-Disclosure Agreement (NDA) if required.",
  },
  {
    q: "Do you provide lifetime support?",
    a: "We provide ongoing support and future updates whenever you need additional development work or modifications.",
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

export default function WebDesignFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section text-center">
      <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
        <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
        FREQUENTLY ASKED QUESTIONS
        <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
        Got Questions? We&apos;ve Got Answers
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
        Everything you need to know before starting your website or web
        application project with HZ Technology.
      </p>

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={faq.q}
              className="rgb-box rounded-lg"
              style={{ ["--box-fill" as string]: "#0a0a0d" }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white"
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
