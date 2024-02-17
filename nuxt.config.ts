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
      meta: [{ name: 'google', content: 'notranslate' }, {name: 'theme-color', content: '#ffffff'}],
      title: 'MEMOKU',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        {
          rel: 'icon',
          href: '/favicon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
        },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png' },
      ],
    },
  },
  plugins: [
    '~/plugins/dexie.client.ts',
    '~/plugins/longClick.directive.client.ts',
  ],
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
      name: 'MEMOKU',
      short_name: 'MEMOKU',
      description: 'Simple memo webapp.',
      start_url: '/',
      theme_color: '#000000',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
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
          type: 'image/png',
        },
      ],
    },
    workbox: {
      globDirectory: '.output/public/',
      globPatterns: ['**/*.{json,ico,html,png,js,txt,css,svg}'],
      swDest: '.output/public/sw.js',
      swSrc: 'src/public/service-worker.js',
      injectionPoint: 'injectionPoint',
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      type: 'module',
      navigateFallbackAllowlist: [/^index.html$/],
    },
  },
  experimental: {
    payloadExtraction: false,
  },
})
