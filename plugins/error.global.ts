export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', () => {
    // if (process.client) alert(useI18n().t('BrowserNotice'))
  })
})
