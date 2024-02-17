export default defineNuxtRouteMiddleware((to) => {
  if (process.client && !navigator.onLine) {
    caches.open('memoku-cache-2').then((cache) => {
      cache.keys().then((keys) => {
        keys.forEach((key) => {
          const path = key.url.replace(location.origin, '')
          if (path !== '/' && path !== to.path) cache.delete(key)
        })

        fetch('/').then((response) => cache.put(to.path, response))
      })
    })
  }
})
