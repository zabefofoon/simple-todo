<template>
  <!-- 12개월 동안 한달에 몇개 Todo -->
  <div
    class="h-full lg:max-h-[75%] | my-auto | flex items-center justify-center">
    <canvas ref="canvas" width="100%"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto'

const i18n = useI18n()

const todoStore = useTodoStore()
const storageStore = useStorageStore()

const canvas = ref<HTMLCanvasElement>()

const doneTodos = computed(() => {
  const map =
    todoStore.todos
      ?.filter(
        (todo) =>
          new Date(todo.created || 0).getFullYear() === new Date().getFullYear()
      )
      .filter((todo) => todo.done)
      .map((todo) => new Date(todo.created || 0).getMonth())
      .reduce<Record<string, number>>((acc, current) => {
        acc[current] = (acc[current] || 0) + 1
        return acc
      }, {}) || {}

  return Array(12)
    .fill(0)
    .map((_, index) => map[index])
})

const undoneTodos = computed(() => {
  const map =
    todoStore.todos
      ?.filter(
        (todo) =>
          new Date(todo.created || 0).getFullYear() === new Date().getFullYear()
      )
      .filter((todo) => !todo.done)
      .map((todo) => new Date(todo.created || 0).getMonth())
      .reduce<Record<string, number>>((acc, current) => {
        acc[current] = (acc[current] || 0) + 1
        return acc
      }, {}) || {}

  return Array(12)
    .fill(0)
    .map((_, index) => map[index])
})

onMounted(() => {
  new Chart(toValue(canvas)!, {
    type: 'bar',
    data: {
      labels: Array(12)
        .fill(0)
        .map((_, index) => index + 1),
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
          backgroundColor: 'rgba(71, 85, 105, 1)',
          borderColor: 'rgba(71, 85, 105, 1)',
          borderWidth: 1,
          data: toValue(doneTodos),
        },
      ],
    },
    options: {
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: storageStore.getThemeClass('', 'white'),
          },
          grid: {
            color: storageStore.getThemeClass(
              'rgba(0, 0, 0, .1)',
              'rgba(255, 255, 255, .1)'
            ),
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: storageStore.getThemeClass('', 'white'),
          },
          grid: {
            color: storageStore.getThemeClass(
              'rgba(0, 0, 0, .1)',
              'rgba(255, 255, 255, .1)'
            ),
          },
        },
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
