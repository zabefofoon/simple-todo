<template>
  <div
    class="h-full | hidden lg:flex items-center justify-center gap-2 | p-2 lg:p-3 | border rounded-lg"
    :class="storageStore.getThemeClass('bg-white', 'border-slate-700')">
    <div class="relative">
      <div
        class="absolute top-0 left-0 -translate-y-1/2 | flex"
        :class="storageStore.getThemeClass('', 'text-white')">
        <span class="text-[1.5cqh]">
          {{ currentYear }}
        </span>
        <div v-if="day" class="text-[1.5cqh]">({{ i18n.t(day) }})</div>
      </div>
      <span
        class="text-[4cqh]"
        :class="storageStore.getThemeClass('', 'text-white')">
        {{ currentTime }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const storageStore = useStorageStore()
const i18n = useI18n()

const currentYear = ref('')
const setYear = () => {
  const now = new Date()

  // 연도, 월, 일을 두 자리 숫자로 포맷하기
  const year = String(now.getFullYear()).slice(2) // 연도의 마지막 두 자리
  const month = String(now.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, '0')

  // YY.MM.DD 형식으로 조합하기
  currentYear.value = `${year}.${month}.${day}`
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

onMounted(() => {
  setInterval(() => {
    setYear()
    setCurrentTime()
    setDay()
  }, 1000)
})
</script>
