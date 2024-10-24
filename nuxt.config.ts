// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'netlify',
  },
  devtools: { enabled: false },
  css: [
    '~/assets/styles/style.scss',
    'v-calendar/style.css',
    'vue-final-modal/style.css',
  ],

  modules: [
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-gtag',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
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
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/sitemap',
  ],

  gtag: {
    id: 'G-R5C8GX5QQN',
    initCommands: [
      // Setup up consent mode
      [
        'consent',
        'default',
        {
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          ad_storage: 'granted',
          analytics_storage: 'granted',
          wait_for_update: 500,
        },
      ],
    ],
  },

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'initial-scale=1, viewport-fit=cover' },
        { name: 'google', content: 'notranslate' },
        {
          name: 'naver-site-verification',
          content: 'b3458eadb2e3d7c1424c5024e346e133be443156',
        },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
        {
          name: 'description',
          content:
            'Memoku is a memo web app designed for efficient task management. It features a simple UI and dark mode for an enhanced user experience. Key functionalities include task creation, tag-based task management, push notifications, offline usage, date-based task organization, and task analysis. With Memoku, you can systematically manage your tasks anytime, anywhere, and ensure you never miss important deadlines.',
        },
        {
          name: 'keywords',
          content:
            'web, simple, todo, todolist, reminder, remind, memo, app, application, nuxt3, pwa, offline, free, online',
        },
        { property: 'og:site_name', content: 'MEMOKU' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://memoku.netlify.app/' },
        {
          property: 'og:title',
          content:
            'MEMOKU: A free, offline-capable, sleek web app for simple note-taking.',
        },
        {
          property: 'og:description',
          content:
            'Memoku is a memo web app designed for efficient task management. It features a simple UI and dark mode for an enhanced user experience. Key functionalities include task creation, tag-based task management, push notifications, offline usage, date-based task organization, and task analysis. With Memoku, you can systematically manage your tasks anytime, anywhere, and ensure you never miss important deadlines.',
        },
        {
          property: 'og:image',
          content: 'https://memoku.netlify.app/ogImage.png',
        },
      ],
      title:
        'MEMOKU: A free, offline-capable, sleek web app for simple note-taking.',
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '57x57',
          href: '/apple-icon-57x57.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '60x60',
          href: '/apple-icon-60x60.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '72x72',
          href: '/apple-icon-72x72.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '76x76',
          href: '/apple-icon-76x76.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '114x114',
          href: '/apple-icon-114x114.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '120x120',
          href: '/apple-icon-120x120.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '144x144',
          href: '/apple-icon-144x144.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '152x152',
          href: '/apple-icon-152x152.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-icon-180x180.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/android-icon-192x192.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: '/favicon-96x96.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
      ],
      script: [
        {
          src: 'https://accounts.google.com/gsi/client',
          async: true,
          defer: true,
        },
        {
          src: 'https://apis.google.com/js/platform.js?onload=init',
          async: true,
          defer: true,
        },
      ],
    },
  },

  plugins: ['~/plugins/dexie.client.ts'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'ko', iso: 'ko-KR', name: '한국어' },
      { code: 'ja', iso: 'ja-JP', name: '日本語' },
    ],
    defaultLocale: 'en',
    vueI18n: './i18n/i18n.config.ts', // if you are using custom path, default
  },
  sitemap: {
    hostname: 'https://memoku.netlify.app', // 사이트의 기본 URL
    gzip: true, // 사이트맵을 압축하여 제공
    routes: [
      // 기본 페이지들
      '/',
      '/todo',
      '/calender',
      '/setting',
      '/notification',
      '/search',
      {
        url: '/memoku',
        changefreq: 'monthly',
        priority: 1,
        links: [
          { lang: 'en', url: 'https://your-website.com/en/memoku' },
          { lang: 'ko', url: 'https://your-website.com/ko/memoku' },
          { lang: 'ja', url: 'https://your-website.com/ja/memoku' },
        ],
      },
    ],
  },
  pwa: {
    registerType: 'autoUpdate',
    strategies: 'injectManifest',
    filename: 'service-worker.js',
    manifest: {
      id: '/',
      name: 'MEMOKU',
      short_name: 'MEMOKU',
      description:
        'MEMOKU: A free, offline-capable, sleek web app for simple note-taking.',
      start_url: '/',
      theme_color: '#000000',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/android-icon-36x36.png',
          sizes: '36x36',
          type: 'image/png',
          density: '0.75',
        },
        {
          src: '/android-icon-48x48.png',
          sizes: '48x48',
          type: 'image/png',
          density: '1.0',
        },
        {
          src: '/android-icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
          density: '1.5',
        },
        {
          src: '/android-icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
          density: '2.0',
        },
        {
          src: '/android-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
          density: '3.0',
        },
        {
          src: '/android-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          density: '4.0',
        },
        {
          src: '/android-icon-192x192.png',
          sizes: '192x192',
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
      categories: ['entertainment', 'lifestyle', 'social'],
      display_override: ['window-controls-overlay', 'standalone'],
      orientation: 'portrait',
      launch_handler: {
        client_mode: ['focus-existing', 'auto'],
      },
      prefer_related_applications: true,
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

  compatibilityDate: '2024-09-15',
})
