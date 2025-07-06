import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        leaf: "#4CAF50",
        earth: "#6D4C41",
        soil: "#EFEBE9",
        sky: "#81D4FA",
        harvest: "#F9A825",
        charcoal: "#263238",
        mist: "#FAFAFA",
      }
    },
  },
  plugins: [],
}
export default config
