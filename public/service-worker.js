import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

self.skipWaiting()
clientsClaim()
cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST || [])

const cacheName = 'memoku-cache-13'
const cacheUrl = ['/']

self.addEventListener('install', (event) =>
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(cacheUrl))
  )
)

self.addEventListener('fetch', (event) => {
  if (!navigator.onLine)
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => response ?? fetch(event.request))
    )
})

self.addEventListener('activate', (event) =>
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) caches.delete(name)
        })
      )
    )
  )
)

const timers = []

self.addEventListener('message', ({ data }) => {
  // if (data.type === 'registerTimer') registerTimer(data.todos)
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client)
          return client.focus().then(() => {
            setTimeout(() => {
              const channel = new BroadcastChannel('sw-messages')
              channel.postMessage({
                type: 'notificationclick',
                todoId: event.notification.data.todoId,
              })
            }, 1000)
          })
      }
      if (clients.openWindow)
        return clients.openWindow('/notification').then(() => {
          setTimeout(() => {
            const channel = new BroadcastChannel('sw-messages')
            channel.postMessage({
              type: 'notificationclick',
              todoId: event.notification.data.todoId,
            })
          }, 7000)
        })
    })
  )
})

self.addEventListener('push', (event) => {
  const { todoId, text } = JSON.parse(event.data.text())
  self.registration.showNotification('Check!', {
    body: text,
    requireInteraction: true,
    renotify: true,
    tag: 'MEMOKU',
    timestamp: Math.floor(Date.now()),
    icon: 'https://memoku.netlify.app/192x192.png',
    badge: 'https://memoku.netlify.app/48x48.png',
    data: {
      todoId,
    },
  })

  const channel = new BroadcastChannel('sw-messages')
  channel.postMessage({ type: 'notification', todoId })
})
