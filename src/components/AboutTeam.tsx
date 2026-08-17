"use client";

import { useEffect, useState } from "react";
import { subscribeTeam, type TeamMember } from "@/lib/firestore/team";

export default function AboutTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    const unsub = subscribeTeam(setTeam);
    return () => unsub?.();
  }, []);

  if (team.length === 0) return null;

  return (
    <section className="section text-center">
      <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
        <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
        OUR TEAM
        <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
        Meet The Minds Behind FAAH Technology
      </h2>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
        {team.map((member) => (
          <div
            key={member.id}
            className="rgb-box overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-1"
            style={{ ["--box-fill" as string]: "#131318" }}
          >
            <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-bg-card to-bg text-4xl font-display font-semibold text-gold/30">
              {member.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                member.name.charAt(0)
              )}
            </div>
            <div className="px-3 py-4">
              <p className="font-display text-sm font-semibold text-gold">{member.name}</p>
              <p className="mt-0.5 text-[11px] text-muted">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
