/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        aurora: {
          from: "#7F5AF0",
          to: "#FFB4ED",
        },
        dreamy: {
          bg: "#0F172A",
          blur: "rgba(255, 255, 255, 0.05)",
        },
      },
    },
  },
  plugins: [],
};
