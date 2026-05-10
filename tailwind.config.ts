import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        // Rankix brand
        primary: {
          DEFAULT: "#4F6BFF",
          dark: "#3B5BFA",
          light: "#EEF2FF",
          foreground: "#FFFFFF"
        },
        purple: {
          DEFAULT: "#7C5DFA",
          light: "#F0EBFE"
        },
        success: {
          DEFAULT: "#10B981",
          light: "#D1FAE5"
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FEF3C7"
        },
        danger: {
          DEFAULT: "#EF4444",
          light: "#FEE2E2"
        },
        // Score breakdown bar colors
        bar: {
          blue: "#4F6BFF",
          green: "#10B981",
          purple: "#8B5CF6",
          orange: "#F59E0B",
          teal: "#14B8A6",
          pink: "#EC4899"
        },
        // Surfaces
        bg: "#F7F9FC",
        surface: "#FFFFFF",
        border: "#E5E9F0",
        "border-light": "#EFF2F7",
        // Text
        text: {
          DEFAULT: "#0F172A",
          light: "#475569",
          muted: "#94A3B8"
        }
      },
      backgroundImage: {
        "gradient-r": "linear-gradient(135deg, #4F6BFF 0%, #7C5DFA 100%)"
      },
      borderRadius: {
        sm: "0.625rem",
        DEFAULT: "0.875rem",
        md: "0.875rem",
        lg: "1rem"
      },
      boxShadow: {
        sm: "0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.03)",
        md: "0 4px 12px rgba(15, 23, 42, 0.06)",
        lg: "0 8px 24px rgba(15, 23, 42, 0.08)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
