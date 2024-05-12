<template>
  <VitePwaManifest />
  <NuxtPage />
  <AddHomeScreenGuideIos v-if="isSafari" />
  <AddHomeScreenGuideAndroid v-else />
</template>
<script setup lang="ts">
import type { Theme } from './models/Setting'
import { useAlarmStore } from './store/alarm.store'
import { useScrollStore } from './store/scroll.store'
import { useSettingStore } from './store/setting.store'
import { useStorageStore } from './store/storage.store'
import { useTodoStore } from './store/todo.store'

const { isSafari } = useDevice()

const todoStore = useTodoStore()
const scrollStore = useScrollStore()
const storageStore = useStorageStore()
const settingStore = useSettingStore()
const alarmStore = useAlarmStore()

onBeforeMount(() => {
  settingStore.initSetting()
})

onMounted(() => {
  todoStore.getAllTodos()
  scrollStore.listenHistoryUpdate()

  const channel = new BroadcastChannel('sw-messages')
  channel.addEventListener('message', (event) => {
    if (event.data?.type === 'notification') {
      alarmStore.removeReadNewAlarms(event.data.todoId)
      alarmStore.addNewAlarm(event.data.todoId)
    }
    if (event.data?.type === 'notificationclick') {
      navigateTo(`/todo/${event.data.todoId}`)
      alarmStore.addNewAlarm(event.data.todoId)
      alarmStore.addReadNewAlarm(event.data.todoId)
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
</script>
