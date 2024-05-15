export default defineNuxtRouteMiddleware(async (to) => {
  if (process.client && window.caches) {
    const cache = await caches.open('memoku-cache-13')
    const keys = await cache.keys()
    keys.forEach((key) => {
      const path = key.url.replace(location.origin, '')
      if (path !== '/' && path !== to.path) cache.delete(key)
    })

    const response = await fetch('/', {cache: 'force-cache'})
    cache.put(to.path, response)
  }
})
