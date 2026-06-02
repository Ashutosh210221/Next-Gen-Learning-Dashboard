import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep, near-black surfaces for the dark-only theme.
        ink: {
          950: "#050507",
          900: "#0a0a0f",
          850: "#0e0e15",
          800: "#13131c",
          700: "#1b1b27",
          600: "#262635",
        },
        glow: {
          cyan: "#22d3ee",
          sky: "#38bdf8",
          blue: "#3b82f6",
          teal: "#2dd4bf",
          emerald: "#34d399",
          amber: "#fbbf24",
          rose: "#fb7185",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34,211,238,0.25), 0 8px 40px -12px rgba(34,211,238,0.45)",
      },
      keyframes: {
        // Subtle pulse used by skeleton loaders.
        "skeleton-pulse": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.85" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "skeleton-pulse": "skeleton-pulse 1.6s ease-in-out infinite",
        "gradient-pan": "gradient-pan 8s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
