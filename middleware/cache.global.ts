export default defineNuxtRouteMiddleware(() => {
  /* if (process.client) {
    const cache = await caches.open('memoku-cache-3')
    const keys = await cache.keys()

    keys.forEach((key) => {
      const path = key.url.replace(location.origin, '')
      if (path !== '/' && path !== to.path) cache.delete(key)
    })

    fetch(to.path).then((response) => cache.put(to.path, response))
  } */
})
