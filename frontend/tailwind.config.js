/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "rgb(17, 26, 44)",
        main_white: "#E4EAF2",
        second_yelow: "#EAE55D",
      },
      screens: {
        sm: "270px",
      },
    },
  },
  plugins: [],
};
