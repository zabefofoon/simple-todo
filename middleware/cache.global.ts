export default defineNuxtRouteMiddleware((to) => {
  if (process.client && window.caches) {
    caches.open('memoku-cache-12').then((cache) => {
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
