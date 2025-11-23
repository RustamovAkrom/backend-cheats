import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // используем class-based dark mode
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        "primary-dark": "#60a5fa",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
