/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./app.vue", "./error.vue"],
  theme: {
    container: {
      center: true,
      padding: "16px",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "1280px", // atau sesuaikan dengan nilai yang diinginkan
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#BD00FF",
        secondary: "#FCFCFC",
        alternative: "#070707",
        primary_dark: "#192026",
      },
      fontFamily: {
        aubrey: ["Aubrey", "sans-serif"],
      },
    },
  },
  plugins: [],
};
