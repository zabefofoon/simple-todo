// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/styles/style.scss', 'v-calendar/style.css'],
  modules: [
    '@vite-pwa/nuxt',
    '@nuxtjs/i18n',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  app: {
    head: {
      meta: [{ name: 'google', content: 'notranslate' }],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  i18n: {
    vueI18n: './i18n/i18n.config.ts', // if you are using custom path, default
  },
  pwa: {
    registerType: 'autoUpdate',
    strategies: 'injectManifest',
    filename: 'service-worker.js',
    manifest: {
      id: '/',
      name: 'Nuxt Vite PWA',
      short_name: 'NuxtVitePWA',
      description: 'Simple Lotto PWA',
      theme_color: '#ffffff',
      display: 'standalone'
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
  experimental: {
    payloadExtraction: false,
  },
})
