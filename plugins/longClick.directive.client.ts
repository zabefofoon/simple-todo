export default defineNuxtPlugin((nuxtApp) => {
  let timeout: ReturnType<typeof setTimeout>

  nuxtApp.vueApp.directive('long-click', {
    mounted(el, { value }) {
      el.addEventListener('pointerdown', (event: Event) => {
        timeout = setTimeout(() => {
          event.preventDefault()
          event.stopPropagation()
          value(event)
        }, 500) // 1000 milliseconds (1 second) for long click
      })

      el.addEventListener('pointerup', (event: Event) => {
        event.preventDefault()
        event.stopPropagation()
        clearTimeout(timeout)
      })

      el.addEventListener('pointerleave', (event: Event) => {
        event.preventDefault()
        event.stopPropagation()
        clearTimeout(timeout)
      })
    },
  })
})
