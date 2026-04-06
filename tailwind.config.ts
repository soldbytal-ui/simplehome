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
        background: "#FFFFFF",
        surface: "#FAFAF8",
        surface2: "#F5F5F0",
        "surface-dark": "#1A1A1A",
        primary: "#1A1A1A",
        muted: "#787878",
        accent: "#1A1A1A",
        copper: "#8B7355",
        "copper-light": "#A89279",
        border: "rgba(0,0,0,0.06)",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "hero-mobile": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "section": ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "section-sm": ["2rem", { lineHeight: "1.2" }],
        "card-title": ["1.375rem", { lineHeight: "1.3" }],
        "nav": ["0.75rem", { lineHeight: "1", letterSpacing: "0.1em" }],
        "label": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.15em" }],
        "meta": ["0.625rem", { lineHeight: "1", letterSpacing: "0.12em" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 30px rgba(0,0,0,0.08)",
        subtle: "0 1px 3px rgba(0,0,0,0.03)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      maxWidth: {
        container: "1400px",
      },
      borderRadius: {
        none: "0",
        xs: "1px",
      },
    },
  },
  plugins: [],
};
export default config;
