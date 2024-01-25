<template>
  <VitePwaManifest/>
  <NuxtPage />
</template>
<script setup lang="ts">
import { Todo } from './models/Todo'
import { useScrollStore } from './store/scroll.store'
import { useSettingStore } from './store/setting.store'
import { useStorageStore } from './store/storage.store'
import { useTodoStore } from './store/todo.store'

const i18n = useI18n()

const todoStore = useTodoStore()
const scrollStore = useScrollStore()
const storageStore = useStorageStore()
const settingStore = useSettingStore()

const getLanguage = () => settingStore.setting?.language || 'en'

onMounted(() => {
  i18n.setLocale(getLanguage())
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
</script>
