<template>
  <VitePwaManifest />
  <NuxtPage />
  <AddHomeScreenGuideIos v-if="isSafari" />
  <AddHomeScreenGuideAndroid v-else />
</template>
<script setup lang="ts">
import type { Theme } from './models/Setting'
import { Todo } from './models/Todo'
import { useScrollStore } from './store/scroll.store'
import { useSettingStore } from './store/setting.store'
import { useStorageStore } from './store/storage.store'
import { useTodoStore } from './store/todo.store'

const { isSafari } = useDevice()
const route = useRoute()
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

watch(
  () => storageStore.theme,
  (value: Theme) =>
    setTimeout(() => {
      if (process.client)
        document
          .querySelector('meta[name="theme-color"]')
          ?.setAttribute('content', value === 'dark' ? '#0f172a' : '#ffffff')
    }),
  { immediate: true }
)

if (process.client && 'serviceWorker' in navigator && route.query.dev) {
  const permission = await Notification.requestPermission()
  if (permission === 'granted') {
    const mid = storageStore.getUniqueId()
      ? storageStore.getUniqueId()
      : storageStore.setUniqueId()

    const registrations = await navigator.serviceWorker.getRegistrations()
    for (const registration of registrations) {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY, // 발급받은 vapid public key
      }

      const pushSubscription = await registration.pushManager.subscribe(
        subscribeOptions
      )
      const res = await $fetch(import.meta.env.VITE_ALARM_SERVER, {
        method: 'post',
        body: {
          mid,
          pushSubscription,
        },
      })
      console.log(res)
    }
  }
}
</script>
