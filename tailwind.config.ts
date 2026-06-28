import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { navy: "#061f3d", gold: "#d8a330", cream: "#f8f2e5" },
      boxShadow: { soft: "0 18px 45px rgba(6,31,61,.12)" },
    },
  },
  plugins: [],
};
export default config;
