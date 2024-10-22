<template>
  <VitePwaManifest />
  <NuxtPage />
  <ClientOnly>
    <CookiePopup />
  </ClientOnly>

  <AddHomeScreenGuideIos v-if="isSafari" />
  <AddHomeScreenGuideAndroid v-else />
</template>
<script setup lang="ts">
import type { Theme } from './models/Setting'
import { useAlarmStore } from './store/alarm.store'
import { useBulkStore } from './store/bulk.store'
import { useGoogleStore } from './store/google.store'
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
const googleStore = useGoogleStore()
const bulkStore = useBulkStore()

const { isIos } = useDevice()
const route = useRoute()

onBeforeMount(() => {
  settingStore.initSetting()
})

onMounted(async () => {
  if (route.path === '/google-auth') return

  if (googleStore.googleAccessToken) {
    await googleStore.getAllTodo()
    await googleStore.syscTags()
  }

  await todoStore.getAllTodos()

  const channel = new BroadcastChannel('sw-messages')
  channel.addEventListener('message', (event) => {
    if (event.data?.type === 'notification') {
      alarmStore.removeReadNewAlarms(event.data.todoId)
      alarmStore.addNewAlarm(event.data.todoId)
    }
    if (event.data?.type === 'notificationclick') {
      navigateTo(`?todo=${event.data.todoId}`)
      setTimeout(() => {
        alarmStore.addNewAlarm(event.data.todoId)
        alarmStore.addReadNewAlarm(event.data.todoId)
      }, 2000)
    }
  })

  if (window.innerWidth < 1024) settingStore.setScreen('sm')
  else settingStore.setScreen('lg')
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024) settingStore.setScreen('sm')
    else settingStore.setScreen('lg')
  })

  if (isIos) {
    let sipedTimer: NodeJS.Timeout
    let touchCancelTimer: NodeJS.Timeout
    let siped = false

    window.addEventListener(
      'touchmove',
      ({ changedTouches }: TouchEvent) => {
        if (changedTouches[0].clientX < 0) siped = true
      },
      { passive: true }
    )

    window.addEventListener(
      'touchend',
      () => {
        if (siped) {
          settingStore.setIsSiped(true)
          clearTimeout(sipedTimer)
          sipedTimer = setTimeout(() => {
            settingStore.setIsSiped(false)
            siped = false
          }, 1000)
        }
      },
      { passive: true }
    )

    window.addEventListener(
      'touchcancel',
      () => {
        settingStore.setIsTouchCanceled(true)
        clearTimeout(touchCancelTimer)
        touchCancelTimer = setTimeout(
          () => settingStore.setIsTouchCanceled(false),
          1000
        )
      },
      { passive: true }
    )
  }
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
      if (import.meta.client)
        document
          .querySelector('meta[name="theme-color"]')
          ?.setAttribute('content', value === 'dark' ? '#0f172a' : '#ffffff')
    }),
  { immediate: true }
)

watch(
  () => route.query,
  (query) => {
    if (!query.bulk) bulkStore.emptyTodoIds()
  }
)
</script>
