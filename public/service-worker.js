import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

self.skipWaiting()
clientsClaim()
cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST || [])

const timers = []

const channel = new BroadcastChannel('sw-messages')

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client)
          return client.focus().then(() => {
            channel.postMessage({
              type: 'notificationclick',
              todoId: event.notification.data.todoId,
            })
          })
      }
      if (clients.openWindow)
        return clients.openWindow('/?notification=true').then(() => {
          channel.postMessage({
            type: 'notificationclick',
            todoId: event.notification.data.todoId,
          })
        })
    })
  )
})

self.addEventListener('push', (event) => {
  const { todoId, text } = JSON.parse(event.data.text())
  self.registration.showNotification('Memoku!', {
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

  channel.postMessage({ type: 'notification', todoId })
})
