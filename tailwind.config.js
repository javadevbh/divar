/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        persian: ["Vazir", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          red: "#a62626",
        },
      },
      animation: {
        "loader": "rotation 1s linear infinite",
      },
    },
  },
  plugins: [],
};
