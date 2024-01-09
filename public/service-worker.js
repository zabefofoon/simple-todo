/* // install event
self.addEventListener('install', (e) => {
  console.log('[Service Worker] installed')
})

// activate event
self.addEventListener('activate', (e) => {
  console.log('[Service Worker] actived', e)
})

// fetch event
self.addEventListener('fetch', (e) => {
  console.log('[Service Worker] fetched resource ' + e.request.url)
})
 */
const timers = []

const registerTimer = (todos) => {
  timers.forEach(clearTimeout)

  todos.forEach((todo) => {
    const now = new Date()
    const time = new Date(`${todo.date} ${todo.time}`)
    if (time >= now) {
      const timer = setTimeout(() => {
        const body =
          todo.description.length > 30
            ? `${todo.description.slice(0, 30)}...`
            : todo.description

        self.registration.showNotification('Check your memo!', {
          body,
          requireInteraction: true,
          renotify: true,
          tag: 'simple-memo',
          icon: 'https://dummyimage.com/144x144/000/fff',
          timestamp: Math.floor(Date.now()),
          badge: 'https://dummyimage.com/96x96/000/fff',
        })
      }, time - now)

      timers.push(timer)
    }
  })
}

self.addEventListener('message', ({ data }) => {
  if (data.type === 'registerTimer') registerTimer(data.todos)
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus()
      }
      if (clients.openWindow) return clients.openWindow('/')
    })
  )
})
