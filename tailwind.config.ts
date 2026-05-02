import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-obsidian': '#0A0A0A',
        'deep-teal': '#008080',
        'soft-mint': '#A0E8AF',
        'energetic-coral': '#FF7F50',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'neo': '8px 8px 0px 0px rgba(0, 128, 128, 1)',
        'glow': '0 0 20px rgba(0, 128, 128, 0.6)',
      }
    },
  },
  plugins: [],
};
export default config;
