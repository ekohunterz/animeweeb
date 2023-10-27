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
  modules: ["@vueuse/nuxt", "nuxt-swiper", "dayjs-nuxt", "@vueuse/nuxt", "@nuxt/image", "@vite-pwa/nuxt"],
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
  pwa: {
    manifest: {
      name: "Anime Weebs App",
      short_name: "Wibu App",
      description: "Infomarsi Seputar Anime",
      display: "standalone",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: "/icon/android-launchericon-72-72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "/icon/android-launchericon-144-144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/icon/android-launchericon-192-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon/android-launchericon-512-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: null,
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
      cleanupOutdatedCaches: false,
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});
