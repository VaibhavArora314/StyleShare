// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         teko: ["Teko", "sans-serif"],
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode with class strategy
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      primary_orange: {
        0: "#FF7A19",
      },
      darkmode_gray: {
        0: "#303030",
      },
      fontFamily: {
        teko: ["Teko", "sans-serif"],
      },
    },
  },
  plugins: [],
};


