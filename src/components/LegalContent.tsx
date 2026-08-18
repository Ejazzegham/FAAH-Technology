import type { ReactNode } from "react";

export type LegalBlock =
  | { type: "p"; text: ReactNode }
  | { type: "ul"; items: ReactNode[] }
  | { type: "sub"; text: string };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "sub") {
    return <p className="mt-4 text-sm font-semibold text-ink">{block.text}</p>;
  }
  if (block.type === "ul") {
    return (
      <ul className="mt-3 space-y-1.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className="mt-3 text-sm leading-relaxed text-muted">{block.text}</p>;
}

export default function LegalContent({
  lastUpdated,
  intro,
  sections,
  closing,
}: {
  lastUpdated: string;
  intro?: ReactNode;
  sections: LegalSection[];
  closing?: { heading: string; text: ReactNode };
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-medium tracking-wide text-muted">Last Updated: {lastUpdated}</p>

      {intro && <p className="mt-6 text-sm leading-relaxed text-muted">{intro}</p>}

      <div className="mt-10 space-y-9">
        {sections.map((section, i) => (
          <section key={section.heading}>
            <h2 className="font-display text-base font-semibold text-gold">
              {i + 1}. {section.heading}
            </h2>
            {section.blocks.map((block, j) => (
              <Block key={j} block={block} />
            ))}
          </section>
        ))}
      </div>

      {closing && (
        <div className="mt-12 rounded-xl border border-gold/30 bg-gold/5 p-6">
          <h2 className="font-display text-base font-semibold text-ink">{closing.heading}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{closing.text}</p>
        </div>
      )}
    </div>
  );
}
