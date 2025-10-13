// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', 'nuxt-google-translate'],

  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/main.css'
  ],

  googleTranslate: {
    defaultLanguage: 'es',
    supportedLanguages: ['en', 'fr', 'es', 'de', 'ja']
  },
  
  app: {
    baseURL: import.meta.env.NUXT_ROUTE,
    head: {
      title: import.meta.env.NUXT_APP_NAME || 'Muni Antigua Web',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
})