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
          gray: "rgba(0,0,0,.12)"
        },
      },
      animation: {
        "loader": "rotation 1s linear infinite",
      },
      boxShadow : {
        "around" : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
      }
    },
  },
  plugins: [],
};
