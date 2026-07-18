"use client";

/**
 * Centered, gold/champagne gradient page/section title. The gradient sweeps
 * across the whole heading in a slow, continuous shimmer, and each letter
 * rises and fades in with a short left-to-right stagger the moment the
 * title mounts (e.g. "Logo Design" -> L settles in, then O, then G...).
 * Matches the site's existing gold branding (--gold / btn-primary).
 * Pass `rgb` to use the same rainbow flow as the site's animated card/box
 * borders instead.
 */
export default function AnimatedTitle({
  text,
  as: Tag = "h1",
  className = "",
  autoPlay = false,
  rgb = false,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Runs the letter-zoom wave continuously instead of only on hover —
   * use on standalone page titles that aren't sitting inside a hoverable
   * card (e.g. the project detail page heading). */
  autoPlay?: boolean;
  /** Colours the letters with the same rainbow flow used by the site's
   * animated card/box borders, instead of the default gold shimmer. */
  rgb?: boolean;
}) {
  const words = text.split(" ");
  let letterIndex = 0;

  return (
    <Tag
      className={`letter-wave-title text-center ${autoPlay ? "letter-wave-title--auto" : ""} ${
        rgb ? "letter-wave-title--rgb" : ""
      } ${className}`}
    >
      {words.map((word, wIdx) => (
        <span className="letter-wave-word" key={wIdx}>
          {word.split("").map((char, cIdx) => {
            const delay = letterIndex * 0.045;
            letterIndex += 1;
            return (
              <span
                key={cIdx}
                className="letter"
                style={{ animationDelay: `0s, ${delay}s` }}
              >
                {char}
              </span>
            );
          })}
          {wIdx < words.length - 1 && <span className="letter-wave-space"> </span>}
        </span>
      ))}
    </Tag>
  );
}
