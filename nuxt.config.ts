// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  // SEO options via app.head
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  runtimeConfig: {
    public: {
      strapiBaseUri: process.env.STRAPI_BASE_URI || "http://localhost:1337",
      strapiRemoteUri: process.env.STRAPI_REMOTE_URI || "https://your-live-strapi-url.com",
      useLocalStrapi: process.env.USE_LOCAL_STRAPI === "true" || false,
      siteUrl: process.env.SITE_URL || "https://yonk.online",
    },
    private: {
      // Private server-side variables can go here
    },
  },

  // Reference main.scss
  css: ["~/assets/styles/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/variables.scss" as *;',
        },
      },
    },
  },
});
