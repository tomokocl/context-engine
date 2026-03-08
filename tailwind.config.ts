import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#CBA890",
        "accent-dark": "#B8967E",
        "accent-light": "#D9BBA8",
        base: "#EFE9E6",
        "base-dark": "#E0D6D1",
        "base-darker": "#CFC3BC",
        text: "#2D2A29",
        "text-muted": "#6B6360",
        "text-light": "#9E9390",
        surface: "#F7F3F1",
        "surface-dark": "#EAE3DF",
        border: "#D9CFC9",
      },
      fontFamily: {
        sans: ["Noto Sans JP", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
