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
        secondary: "#FAF9F6",
        alternative: "#070707",
        primary_white: "F6F4EB",
        primary_dark: "#192026",
        deep_blue: "#3CA1D5",
        cerise_red: "#DD4854",
      },
      fontFamily: {
        aubrey: ["Aubrey", "sans-serif"],
      },
    },
  },
  plugins: [],
};
