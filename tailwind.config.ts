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
          DEFAULT: "#ffffff",
          soft: "#f5f6f8",
          card: "#ffffff",
        },
        gold: {
          DEFAULT: "#1477f5",
          light: "#5b9dff",
          dark: "#0a3fc4",
        },
        line: "#e6e6ea",
        muted: "#5b5b66",
        ink: "#0d0d10",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #5b9dff 0%, #1477f5 45%, #0a3fc4 100%)",
      },
      boxShadow: {
        gold: "0 0 40px -10px rgba(20,119,245,0.35)",
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
