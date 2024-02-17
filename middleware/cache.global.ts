export default defineNuxtRouteMiddleware(async (to) => {
  if (process.client) {
    const cache = await caches.open('memoku-cache-1')
    const keys = await cache.keys()

    keys.forEach((key) => {
      const path = key.url.replace(location.origin, '')
      if (path !== '/' && path !== to.path) cache.delete(key)
    })

    const response = await fetch(to.path)
    cache.put(to.path, response)
  }
})
