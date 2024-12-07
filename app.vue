<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <CookiePopup />
  </ClientOnly>

  <AddHomeScreenGuideIos v-if="isSafari" />
  <AddHomeScreenGuideAndroid v-else />
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import type { Theme } from './models/Setting'

const { isSafari, isAndroid, isIos } = useDevice()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const settingStore = useSettingStore()
const alarmStore = useAlarmStore()
const googleStore = useGoogleStore()
const bulkStore = useBulkStore()
const snackbarStore = useSnackbarStore()

const route = useRoute()
const i18n = useI18n()

const { gtag } = useGtag()

let googleRequested: Date

let broadcastChannel: BroadcastChannel
const init = async () => {
  if (
    import.meta.client &&
    window.Notification &&
    Notification.permission !== 'granted'
  )
    await Notification.requestPermission()

  const isPWA = window.matchMedia('(display-mode: standalone)').matches

  if (isPWA && isAndroid) {
    // 페이지가 로드될 때 히스토리 추가
    navigateTo({ query: { ...route.query, f: '1' } })

    window.addEventListener('popstate', () => {
      if (!history.state || !history.state.back) {
        // 히스토리의 `back` 상태가 없을 경우 안내 메시지 표시
        snackbarStore.showSnackbar({
          message: i18n.t('AppCloseGuide'),
          type: 'info',
        })

        setTimeout(() => navigateTo({ query: { ...route.query, f: '1' } }), 100)
      }
    })
  }

  await loadAllTodos()

  broadcastChannel = new BroadcastChannel('sw-messages')
  broadcastChannel.addEventListener('message', (event) => {
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

  watch(
    () => route.path,
    (path) => {
      if (!['/news/', '/memoku'].find((item) => path.includes(item)))
        loadAllTodos()
    }
  )
}

const isLoadedAllTodos = ref(false)
const loadAllTodos = async () => {
  if (['/news/', '/memoku'].find((item) => route.path.includes(item))) return

  if (isLoadedAllTodos.value) return

  if (navigator.onLine && googleStore.googleAccessToken) {
    await googleStore.getAllTodo()
    await googleStore.syscTags()
    googleRequested = new Date()
  }

  await todoStore.getAllTodos()
  isLoadedAllTodos.value = true
}

const isOver20Min = (date1: Date, date2: Date) => {
  const diffInMinutes = dayjs(date2).diff(dayjs(date1), 'minute') // 두 날짜의 차이를 분 단위로 계산
  return diffInMinutes >= 20 // 20분 이상일 경우 true 반환
}

onBeforeMount(() => {
  if (window.innerWidth < 1024) settingStore.setScreen('sm')
  else settingStore.setScreen('lg')
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024) settingStore.setScreen('sm')
    else settingStore.setScreen('lg')
  })

  window.addEventListener('pageshow', (event) => {
    if (event.persisted === true) {
      // Send another pageview if the page is restored from bfcache.
      gtag('event', 'page_view')
    }
  })

  storageStore.setLanguage(storageStore.language)
  settingStore.initSetting()

  preloadRouteComponents('/')
  preloadRouteComponents('/todo')
  preloadRouteComponents('/calender')
  preloadRouteComponents('/news')
  preloadRouteComponents('/setting')
})

onMounted(() => {
  if (route.query.recoverData) return
  if (route.path === '/google-auth') return

  document.addEventListener('visibilitychange', async () => {
    if (
      document.visibilityState === 'visible' &&
      isOver20Min(googleRequested, new Date())
    )
      loadAllTodos()
  })
  useCookie('x-origin', { maxAge: 86400 }).value = location.origin
  init()
})

onBeforeUnmount(() => {
  broadcastChannel?.close()
})

useHead(() => ({
  title: i18n.t('PageTitle'),
  meta: [
    {
      name: 'description',
      content: i18n.t('PageDescription'),
    },
    {
      name: 'keywords',
      content: i18n.t('PageKeywords'),
    },
    {
      property: 'og:title',
      content: i18n.t('PageTitle'),
    },
    {
      property: 'og:description',
      content: i18n.t('PageDescription'),
    },
  ],
}))

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
  (query, oldQuery) => {
    if (!query.bulk) bulkStore.emptyTodoIds()

    if (!oldQuery.authed && query.authed) init()
  }
)
</script>
