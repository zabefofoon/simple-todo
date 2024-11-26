import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'

self.skipWaiting()
clientsClaim()
cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST || [])

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'html-cache',
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          // 성공적인 응답만 캐싱
          return response && response.ok ? response : null
        },
      },
      {
        cachedResponseWillBeUsed: async ({ cachedResponse, event }) => {
          // 캐시된 데이터가 유효하지 않으면 네트워크 요청을 시도
          if (!cachedResponse) {
            console.warn(
              '캐시가 없습니다. 네트워크 요청을 시도합니다.',
              event.request.url
            )
          }
          return cachedResponse
        },
      },
    ],
  })
)

const timers = []

const channel = new BroadcastChannel('sw-messages')

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client)
          return client.focus().then(() => {
            setTimeout(() => {
              channel.postMessage({
                type: 'notificationclick',
                todoId: event.notification.data.todoId,
              })
            }, 1000)
          })
      }
      if (clients.openWindow)
        return clients.openWindow('/?notification=true').then(() => {
          setTimeout(() => {
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

  channel.postMessage({ type: 'notification', todoId })
})
