<template>
  <div
    class="text-theme bg-theme | w-full flex items-center justify-center | pt-4 pb-1.5 | border border-theme rounded-lg">
    <div v-if="!loadingStore.todoLoading" class="relative | w-full text-center">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2/3">
        <span class="text-[11px]">
          {{ currentYear }}
        </span>
        <span v-if="day" class="text-[11px]">({{ i18n.t(day) }})</span>
      </div>
      <span class="text-[24px]">
        {{ currentTime }}
      </span>
    </div>
    <Skeletor v-else class="w-2/3 h-[30px] | mb-4" />
  </div>
</template>

<script setup lang="ts">
import etcUtil from '~/utils/etc'

const storageStore = useStorageStore()
const loadingStore = useLoadingStore()
const i18n = useI18n()

const currentYear = ref('')
const setYear = () => {
  const now = new Date()

  // YY.MM.DD 형식으로 조합하기
  currentYear.value = etcUtil.formatDate(now.getTime(), storageStore.language)
}

const currentTime = ref('')
const setCurrentTime = () => {
  const now = new Date()

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  currentTime.value = `${hours}:${minutes}:${seconds}`
}

const day = ref('')
const setDay = () => {
  const now = new Date()

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  day.value = days[now.getDay()]
}
let timer: NodeJS.Timeout
onMounted(() => {
  setYear()
  setCurrentTime()
  timer = setInterval(() => setCurrentTime(), 1000)
  setDay()
})

onBeforeMount(() => {
  clearInterval(timer)
})
</script>
