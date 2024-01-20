<template>
  <div class="flex flex-col gap-3 | w-full min-w-[200px] | border | p-2 lg:p-3">
    <div class="font-bold">{{ $t('Tags') }}</div>
    <div class="h-full | flex items-center justify-center">
      <canvas ref="canvas" width="100%"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import { useTodoStore } from '~/store/todo.store'

const canvas = ref<HTMLCanvasElement>()

const todoStore = useTodoStore()

const tagInfo = computed(() => {
  return (
    todoStore.todos
      ?.flatMap((todo) => todo.tags)
      .map((tag) => tag.label)
      .reduce<Record<string, number>>((acc, current) => {
        acc[current] = (acc[current] || 0) + 1
        return acc
      }, {}) || {}
  )
})

onMounted(() => {
  new Chart(toValue(canvas)!, {
    type: 'bar',
    data: {
      labels: Object.keys(toValue(tagInfo)),
      datasets: [
        {
          label: 'Data Set',
          data: Object.values(toValue(tagInfo)),
          backgroundColor: 'rgba(71, 85, 105, 0.2)', // 바의 배경색
          borderColor: 'rgba(71, 85, 105, 1)', // 바의 테두리 색
          borderWidth: 1, // 테두리 두께
        },
      ],
    },
    options: {
      maintainAspectRatio: false, // false로 설정하면 canvas 크기가 변경됩니다.
      aspectRatio: 1, // 원하는 가로:세로 비율로 설정
      indexAxis: 'y',
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
