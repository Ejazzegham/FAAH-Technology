"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What desktop software development services do you offer?",
    a: "We develop custom desktop applications tailored to your business needs, including ERP systems, CRM software, POS systems, inventory management, accounting software, HR systems, hospital management, school management, and other business automation solutions.",
  },
  {
    q: "Do you provide software installation and deployment?",
    a: "Yes. We assist with software installation, setup, configuration, user training, and deployment across your organization.",
  },
  {
    q: "Do you create custom desktop software?",
    a: "Yes. Every desktop application is built from scratch to match your business processes, workflow, and operational requirements.",
  },
  {
    q: "Which operating systems do you support?",
    a: "We develop software for Windows, macOS, Linux, and cross-platform desktop applications.",
  },
  {
    q: "Which technologies do you use?",
    a: "We work with modern technologies including Electron.js, React.js, Vite, Node.js, JavaScript, TypeScript, C#, .NET, Python, SQLite, MySQL, PostgreSQL, and Firebase.",
  },
  {
    q: "Can the software work without an internet connection?",
    a: "Yes. We specialize in offline desktop applications that store data locally and synchronize with cloud servers whenever an internet connection is available.",
  },
  {
    q: "Can multiple users access the software?",
    a: "Yes. We can build multi-user desktop applications with role-based permissions, user authentication, and centralized data management.",
  },
  {
    q: "Can the software connect to an online database?",
    a: "Yes. We can integrate your software with cloud databases, local servers, APIs, and third-party services.",
  },
  {
    q: "Will my desktop software be secure?",
    a: "Yes. We implement secure authentication, user roles, data encryption, backup solutions, and access controls to protect your business data.",
  },
  {
    q: "Can you develop POS software?",
    a: "Yes. We build complete Point of Sale (POS) systems with inventory management, barcode scanning, receipt printing, sales reporting, customer management, and multi-store support.",
  },
  {
    q: "Can you develop ERP and CRM systems?",
    a: "Yes. We create scalable ERP and CRM solutions to manage customers, sales, inventory, finance, HR, projects, and business operations.",
  },
  {
    q: "Can you integrate barcode scanners, printers, and hardware?",
    a: "Yes. We integrate desktop software with barcode scanners, thermal receipt printers, label printers, cash drawers, card readers, and other business hardware.",
  },
  {
    q: "Can the software generate reports?",
    a: "Yes. We build advanced reporting systems with dashboards, charts, analytics, PDF exports, Excel exports, and printable reports.",
  },
  {
    q: "Can you migrate my old software to a modern system?",
    a: "Yes. We can modernize legacy desktop applications, improve performance, redesign the interface, and migrate your existing data safely.",
  },
  {
    q: "Do you provide database design?",
    a: "Yes. We design secure and scalable databases using SQLite, MySQL, PostgreSQL, SQL Server, and Firebase, depending on your project requirements.",
  },
  {
    q: "Will the software be scalable?",
    a: "Yes. Our software is designed to grow with your business, making it easy to add new modules, users, and features in the future.",
  },
  {
    q: "Can you integrate APIs and third-party services?",
    a: "Yes. We integrate payment gateways, SMS services, email systems, cloud storage, accounting software, AI services, and many other third-party APIs.",
  },
  {
    q: "Can you build AI-powered desktop software?",
    a: "Yes. We develop AI-powered desktop applications featuring intelligent automation, predictive analytics, chatbots, reporting, and business insights.",
  },
  {
    q: "Why should I choose FAAH Technology?",
    a: "We combine creativity, modern design trends, and strategic thinking to deliver premium-quality software that strengthens your business. We focus on originality, fast communication, timely delivery, and complete client satisfaction.",
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

export default function DesktopSoftwareFaq() {
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
        Everything you need to know before starting your desktop software
        project with FAAH Technology.
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
