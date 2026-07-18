"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What mobile app development services do you offer?",
    a: "We develop custom mobile applications for Android, iOS, and cross-platform. Our services include UI/UX design, app development, API integration, backend development, app testing, deployment, and ongoing maintenance.",
  },
  {
    q: "Do you develop apps for both Android and iOS?",
    a: "Yes. We build native Android and iOS applications as well as cross-platform apps using modern frameworks to maximize performance and reduce development time.",
  },
  {
    q: "Can you migrate my existing mobile app to a new technology?",
    a: "Yes. We can modernize your existing application by migrating it to newer frameworks, improving performance, and adding new features.",
  },
  {
    q: "Do you create custom mobile apps?",
    a: "Absolutely. Every application is designed and developed according to your business requirements, branding, and workflow.",
  },
  {
    q: "Which technologies do you use?",
    a: "We use modern technologies including Flutter, React Native, Kotlin, Java, Swift, Firebase, Node.js, Express.js, MongoDB, MySQL, PostgreSQL, REST APIs, and GraphQL.",
  },
  {
    q: "Will my app work on both phones and tablets?",
    a: "Yes. We design responsive applications that work smoothly across different screen sizes and devices.",
  },
  {
    q: "Can you design the UI/UX for my app?",
    a: "Yes. We create modern, user-friendly interfaces with intuitive navigation and visually appealing designs that enhance the user experience.",
  },
  {
    q: "Will my app be fast and secure?",
    a: "Yes. We follow industry best practices for performance optimization, secure authentication, encrypted data storage, and reliable backend architecture.",
  },
  {
    q: "Can you integrate payment gateways?",
    a: "Yes. We integrate secure payment systems such as Stripe, PayPal, Google Pay, Apple Pay, Razorpay, and other supported payment providers.",
  },
  {
    q: "Can you integrate third-party APIs?",
    a: "Yes. We integrate maps, payment gateways, SMS services, email services, social login, AI services, cloud storage, analytics, and many other APIs.",
  },
  {
    q: "Can you publish my app on the App Store and Google Play?",
    a: "Yes. We assist with preparing your app for submission and guide you through publishing it on the Apple App Store and Google Play Store.",
  },
  {
    q: "Can you update or improve my existing app?",
    a: "Yes. We can redesign the interface, add new features, improve performance, fix bugs, and upgrade your app to the latest technologies.",
  },
  {
    q: "Do you offer app maintenance and support?",
    a: "Yes. We provide ongoing maintenance, feature updates, security patches, performance optimization, and technical support after launch.",
  },
  {
    q: "Can my app connect to a website or desktop software?",
    a: "Yes. We develop integrated solutions where your mobile app can synchronize seamlessly with websites, desktop applications, and cloud databases.",
  },
  {
    q: "Will my app be scalable?",
    a: "Yes. We build scalable applications that can grow with your business and support increasing numbers of users and features.",
  },
  {
    q: "Can you build AI-powered mobile applications?",
    a: "Yes. We develop AI-powered apps with features such as chatbots, intelligent recommendations, image recognition, voice assistants, automation, and predictive analytics.",
  },
  {
    q: "Why should I choose HZ Technology?",
    a: "We combine creativity, modern development practices, and strategic thinking to deliver premium-quality apps that strengthen your brand. We focus on originality, fast communication, timely delivery, and complete client satisfaction.",
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

export default function MobileAppFaq() {
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
        Everything you need to know before starting your mobile app project
        with HZ Technology.
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
