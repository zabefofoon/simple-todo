export default defineNuxtPlugin((nuxtApp) => {
  let timeout: ReturnType<typeof setTimeout>

  nuxtApp.vueApp.directive('long-click', {
    mounted(el, { value }) {
      el.addEventListener('pointerdown', (event: Event) => {
        timeout = setTimeout(() => {
          event.preventDefault()
          event.stopPropagation()
          value(event)
        }, 1000) // 1000 milliseconds (1 second) for long click
      })

      el.addEventListener('pointerup', () => {
        clearTimeout(timeout)
      })

      el.addEventListener('pointerleave', () => {
        clearTimeout(timeout)
      })
    },
    getSSRProps(binding, vnode) {
      // you can provide SSR-specific props here
      return {}
    },
  })
})
