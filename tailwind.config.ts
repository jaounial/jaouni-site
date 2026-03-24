import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        surface: "#141414",
        card: "#1a1a1a",
        border: "#272727",
        yellow: "#f5c518",
        "yellow-dim": "#c49a10",
        grey: "#888888",
        "grey-light": "#b0b0b0",
        text: "#e8e8e8",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "Consolas", "monospace"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
