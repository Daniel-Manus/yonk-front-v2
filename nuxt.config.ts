// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      strapiBaseUri: process.env.STRAPI_BASE_URI, // Public env variable
    },
    private: {
      // Private server-side variables can go here
    },
  },

  // Reference main.scss
  css: ["~/assets/styles/main.scss"],
});
