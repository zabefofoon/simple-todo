<template>
  <NuxtPage />
</template>
<script setup lang="ts">
import { useScrollStore } from './store/scroll.store'
import { useStorageStore } from './store/storage.store'
import { useTodoStore } from './store/todo.store'

const todoStore = useTodoStore()
const scrollStore = useScrollStore()
const storageStore = useStorageStore()

onMounted(() => {
  todoStore.getAllTodos()
  scrollStore.listenHistoryUpdate()
  storageStore.getReadExpiredTodo()

  const channel = new BroadcastChannel('sw-messages')
  channel.addEventListener('message', (event) => {
    if (event.data.type === 'notification') storageStore.getReadExpiredTodo()
    else if (event.data.type === 'notificationclick')
      storageStore.getReadExpiredTodo()
  })
})
</script>
