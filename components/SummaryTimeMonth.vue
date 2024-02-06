<template>
  <div class="h-full | flex items-center justify-center">
    <canvas ref="canvas" width="100%"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import { useTodoStore } from '~/store/todo.store'

const i18n = useI18n()

const todoStore = useTodoStore()

const canvas = ref<HTMLCanvasElement>()

const countOccurrences = (arr1: string[], arr2: string[]) =>
  arr1.map((value) =>
    arr2.reduce((count, current) => {
      if (current === value) return count + 1
      return count
    }, 0)
  )

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
}

const timestampToDateString = (timestamp: number) => {
  const date = new Date(timestamp)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
}

const getWeekDays = () => {
  const today = new Date()

  const monday = new Date(today)
  monday.setDate(
    today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
  )

  const sunday = new Date(today)
  sunday.setDate(monday.getDate() + 6)

  return Array(7)
    .fill(false)
    .map((_, index) => {
      const date = new Date(monday)
      date.setDate(monday.getDate() + index)
      return formatDate(date)
    })
}

const doneTodos = computed(() => {
  const weeks = Array(7)
    .fill(0)
    .map((_, index) => getWeekDays()[index])

  const result =
    todoStore.todos
      ?.filter((todo) => todo.done)
      .map((todo) => timestampToDateString(todo.created || 0)) || []

  return countOccurrences(weeks, result)
})

const undoneTodos = computed(() => {
  const weeks = Array(7)
    .fill(0)
    .map((_, index) => getWeekDays()[index])

  const result =
    todoStore.todos
      ?.filter((todo) => !todo.done)
      .map((todo) => timestampToDateString(todo.created || 0)) || []

  return countOccurrences(weeks, result)
})

onMounted(() => {
  new Chart(toValue(canvas)!, {
    type: 'bar',
    data: {
      labels: getWeekDays().map((item) => item.slice(2).replace('-', '.')),
      datasets: [
        {
          label: i18n.t('Undone'),
          backgroundColor: 'rgba(71, 85, 105, .3)',
          borderColor: 'rgba(71, 85, 105, 1)',
          borderWidth: 1,
          data: toValue(undoneTodos),
        },
        {
          label: i18n.t('Done'),
          backgroundColor: 'rgba(34, 197, 94, .4)',
          borderColor: 'rgba(71, 85, 105, 1)',
          borderWidth: 1,
          data: toValue(doneTodos),
        },
      ],
    },
    options: {
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
      maintainAspectRatio: false, // false로 설정하면 canvas 크기가 변경됩니다.
      aspectRatio: 1, // 원하는 가로:세로 비율로 설정
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  })
})
</script>

<style></style>
