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
      name: 'MEMOO',
      short_name: 'MEMOO',
      description: 'Simple memo webapp.',
      theme_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: '48x48.ico',
          sizes: '48x48',
        },
        {
          src: '144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: '192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      screenshots: [
        {
          src: 'screenshot-1.png',
          sizes: '490x945',
          label: 'screenshot',
          form_factor: 'narrow',
          type: 'image/png',
        },
        {
          src: 'screenshot-2.png',
          sizes: '1920x1080',
          label: 'screenshot',
          form_factor: 'wide',
          type: 'image/png'
        }
      ],
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
