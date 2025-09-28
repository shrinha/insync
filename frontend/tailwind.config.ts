import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        "primary-foreground": "var(--color-primary-foreground)",
        accent: "var(--color-accent)",
        "accent-foreground": "var(--color-accent-foreground)",
        card: "var(--color-card)",
        border: "var(--color-border)",
        muted: {
          DEFAULT: "var(--color-muted-foreground)",
        },
        destructive: "var(--color-destructive)",
      },
      borderColor: {
        border: "var(--color-border)",
        input: "var(--color-border)",
      },
    },
  },
  plugins: [],
};

export default config;
