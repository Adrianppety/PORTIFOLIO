import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F4F5EF",
          100: "#E6E9DB",
          200: "#D2D9BC",
          300: "#B6C296",
          400: "#96A675",
          500: "#667344",
          600: "#59663B",
          700: "#4B5320",
          800: "#3D451B",
          900: "#303917",
          950: "#202711",
        },
        accent: {
          50: "#F5F6F0",
          100: "#E9ECDE",
          200: "#D6DCC1",
          300: "#BCC69F",
          400: "#A4B487",
          500: "#87966A",
          600: "#74845C",
          700: "#5F7048",
          800: "#4D5C39",
          900: "#3D492D",
          950: "#28331D",
        },
        dark: {
          50: "#F4F5EF",
          100: "#E7E9DE",
          200: "#D1D6C1",
          300: "#B5BD9D",
          400: "#929E74",
          500: "#667344",
          600: "#4B5320",
          700: "#3B4428",
          800: "#252D1B",
          900: "#10140D",
          950: "#080A07",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(102, 115, 68, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(135, 150, 106, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-gradient": "linear-gradient(135deg, #4B5320 0%, #667344 50%, #87966A 100%)",
        },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;