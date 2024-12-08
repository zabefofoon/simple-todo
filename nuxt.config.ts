// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    // delay the home page
    '/memoku': { delayHydration: 'mount' },
    '/news/**': { delayHydration: 'mount' },
  },
  devServer: {
    port: 3000,
  },
  nitro: {
    preset: 'netlify',
    compressPublicAssets: true,
  },
  devtools: { enabled: true },
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
    '@nuxtjs/seo',
    '@hebilicious/vue-query-nuxt',
    'nuxt-delay-hydration',
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
    loadingStrategy: 'async',
  },

  app: {
    head: {
      meta: [
        {
          name: 'google-site-verification',
          content: 'HO_eOXo5MwUX_eRwSDcHD6kiNYV0rQAAXYCyYAzfoWE',
        },
        { name: 'viewport', content: 'initial-scale=1, viewport-fit=cover' },
        { name: 'google', content: 'notranslate' },
        {
          name: 'naver-site-verification',
          content: 'b3458eadb2e3d7c1424c5024e346e133be443156',
        },
        {
          name: 'naver-site-verification',
          content: 'e158e0ab604264e38626da83f464ef98a5d682e0',
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

      link: [
        {
          rel: 'preload',
          href: 'https://cdn.jsdelivr.net/npm/noto-sans-kr@0.1.1/styles.min.css',
          as: 'style',
          onload: "this.onload=null;this.rel='stylesheet'",
        },
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
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
          href: '/splash_screens/iPhone_16_Pro_Max_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
          href: '/splash_screens/iPhone_16_Pro_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
          href: '/splash_screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
          href: '/splash_screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
          href: '/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
          href: '/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
          href: '/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
          href: '/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
          href: '/splash_screens/iPhone_11__iPhone_XR_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
          href: '/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
          href: '/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
          href: '/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
          href: '/splash_screens/13__iPad_Pro_M4_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
          href: '/splash_screens/12.9__iPad_Pro_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
          href: '/splash_screens/11__iPad_Pro_M4_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
          href: '/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
          href: '/splash_screens/10.9__iPad_Air_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
          href: '/splash_screens/10.5__iPad_Air_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
          href: '/splash_screens/10.2__iPad_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
          href: '/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
          href: '/splash_screens/8.3__iPad_Mini_landscape.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
          href: '/splash_screens/iPhone_16_Pro_Max_portrait.png',
        },
        {
          rel: 'apple-touch-startup-image',
          media:
            'screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
          href: '/splash_screens/iPhone_16_Pro_portrait.png',
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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true, // 사용자의 언어가 변경될 때마다 언어를 리다이렉트
      fallbackLocale: 'en', // 감지된 언어가 지원되지 않을 경우 사용할 기본 언어
    },
  },
  content: {
    documentDriven: true,
  },
  site: { url: 'https://memoku.dev', name: 'MEMOKU' },
  sitemap: {
    autoLastmod: true,
    sources: ['/api/__sitemap__/urls'],
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
        },
        {
          src: '/android-icon-48x48.png',
          sizes: '48x48',
          type: 'image/png',
        },
        {
          src: '/android-icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: '/android-icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: '/android-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: '/android-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
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
      runtimeCaching: [
        {
          urlPattern: ({ url }) => {
            const suffixArray = [
              '.ts',
              '.vue',
              '.svg',
              '.css',
              '.webmanifest',
              '.js',
              '.html',
            ]

            const notCache =
              !url.pathname.includes('/api') && !url.pathname.includes('/rest')

            const cache = suffixArray.some((suffix) =>
              url.pathname.endsWith(suffix)
            )

            return notCache && cache
          },
          handler: 'NetworkFirst',
          options: {
            cacheName: 'static-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 1 * 24 * 60 * 60,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
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
