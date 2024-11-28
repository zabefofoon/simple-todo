export default defineNuxtRouteMiddleware(async (to) => {
  if (process.client && window.caches) {
    caches.open('memoku-cache-13').then((cache) => {
      cache.keys().then((keys) => {
        keys.forEach((key) => {
          const path = key.url.replace(location.origin, '')
          if (path !== '/' && path !== to.path) cache.delete(key)
        })

        fetch('/', { cache: 'force-cache' }).then((response) =>
          cache.put(to.path, response)
        )
      })
    })
  }
})
