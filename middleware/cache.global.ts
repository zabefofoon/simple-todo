export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    caches.open('memoku-cache-1').then((cache) => {
      cache.keys().then((keys) => {
        keys.forEach((key) => {
          const path = key.url.replace(location.origin, '')
          if (path !== '/' && path !== to.path) cache.delete(key)
        })

        fetch(to.path).then((response) => cache.put(to.path, response))
      })
    })
  }
})
