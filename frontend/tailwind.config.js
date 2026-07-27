/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./features/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pulse: {
          ink: "#172126",
          muted: "#64747d",
          teal: "#0f766e",
          deep: "#0b5d57",
          line: "#d8e0e5",
          wash: "#f5f7f9",
          note: "#fff7d6",
        },
      },
    },
  },
  plugins: [],
};
