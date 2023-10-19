// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Aubrey&family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins&family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap",
        },
      ],
      meta: [
        { name: "theme-color", content: "#ffffff" },
        { name: "name", content: "Anime App" },
        { name: "author", content: "Ryuuza" },
      ],
      htmlAttrs: {
        lang: "id",
      },
    },
    pageTransition: {
      name: "fade",
      mode: "out-in", // default
    },
    layoutTransition: {
      name: "slide",
      mode: "out-in", // default
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "https://api.jikan.moe/v4",
    },
  },
  css: ["~/assets/css/main.css"],
  modules: ["@vueuse/nuxt", "nuxt-swiper", "dayjs-nuxt", "@vueuse/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  dayjs: {
    locales: ["en", "id"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "en",
    defaultTimezone: "Asia/Jakarta",
  },
  swiper: {
    // Swiper options
    //----------------------
    prefix: "Swiper",
    styleLang: "css",
    modules: ["navigation", "pagination", "autoplay", "effect-creative"], // all modules are imported by default
  },
});
