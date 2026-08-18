"use client";

import { useEffect, useState } from "react";
import { subscribeServices, type Service } from "@/lib/firestore/services";

const ICONS: Record<string, JSX.Element> = {
  graphic: <path d="M12 2l2.4 4.86L20 8l-4 3.9.94 5.5L12 15l-4.94 2.4L8 11.9 4 8l5.6-1.14L12 2z" />,
  web: <path d="M3 5h18M3 5v14h18V5M3 5l4 4M21 5l-4 4M12 9v10" />,
  mobile: <rect x="7" y="2" width="10" height="20" rx="2" />,
  desktop: <path d="M4 4h16v12H4zM2 20h20M9 20l1-4h4l1 4" />,
  custom: (
    <path d="M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
  ),
  seo: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  marketing: <path d="M4 20V10M11 20V4M18 20v-7" />,
  video: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 9l5 3-5 3V9z" />
    </>
  ),
  writing: <path d="M4 19l1-4L15.5 4.5a1.5 1.5 0 012 2L7 17l-4 2zM13.5 6.5l2 2" />,
};

export default function AboutServices() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const unsub = subscribeServices(setServices);
    return () => unsub?.();
  }, []);

  return (
    <section className="section text-center">
      <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
        <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
        WHAT WE DO
        <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
        Complete Digital Solutions
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-5">
        {services.map((service) => (
          <div key={service.id} className="card flex flex-col items-start">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-gold/40 text-gold">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {ICONS[service.icon] ?? ICONS.custom}
              </svg>
            </div>
            <h3 className="font-display text-sm font-semibold text-gold">{service.title}</h3>
            <p className="mt-3 text-xs leading-relaxed text-muted">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
