import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0a0d",
          soft: "#0f0f13",
          card: "#131318",
        },
        gold: {
          DEFAULT: "#d4a24e",
          light: "#e8c27a",
          dark: "#b8863b",
        },
        line: "#232329",
        muted: "#9a9aa3",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #f0c878 0%, #d4a24e 45%, #a8792f 100%)",
      },
      boxShadow: {
        gold: "0 0 40px -10px rgba(212,162,78,0.35)",
      },
      // Site-wide default border width, matched to the hero image frame
      // (.rgb-box) so every plain `border` utility is visually consistent.
      // border-0 / border-4 / etc. still work as normal for the rare
      // one-off exception.
      borderWidth: {
        DEFAULT: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
