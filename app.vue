<template>
  <VitePwaManifest />
  <NuxtPage />
</template>
<script setup lang="ts">
import { Todo } from './models/Todo'
import { useScrollStore } from './store/scroll.store'
import { useSettingStore } from './store/setting.store'
import { useStorageStore } from './store/storage.store'
import { useTodoStore } from './store/todo.store'

const todoStore = useTodoStore()
const scrollStore = useScrollStore()
const storageStore = useStorageStore()
const settingStore = useSettingStore()

onBeforeMount(() => {
  settingStore.initSetting()
})

onMounted(() => {
  todoStore.getAllTodos()
  scrollStore.listenHistoryUpdate()
  storageStore.getReadExpiredTodo()

  const channel = new BroadcastChannel('sw-messages')
  channel.addEventListener('message', (event) => {
    if (['notification', 'notificationclick'].includes(event.data?.type)) {
      storageStore.removeReadExpiredTodo(String(event.data.todo?.id))
      todoStore.refreshTodo(Todo.of(event.data.todo))
    }
  })
})

useHead({
  htmlAttrs: {
    lang: storageStore.language || 'en',
  },
})
</script>
