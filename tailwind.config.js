/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'theme-1': 'var(--bg-theme-1)',
        'theme-2': 'var(--bg-theme-2)',
        'theme-3': 'var(--bg-theme-3)',
      },
      textColor: {
        theme: 'var(--text-theme)',
      },
      borderColor: {
        theme: 'var(--border-color-theme)',
      },
    },
  },
  plugins: [],
}
