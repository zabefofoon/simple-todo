<template>
  <div class="flex flex-col gap-3 | w-full min-w-[200px] | border | p-2 lg:p-3">
    <div class="font-bold">Done</div>
    <div>
      <canvas ref="canvas" width="100%"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import { useTodoStore } from '~/store/todo.store'

const todoStore = useTodoStore()

const doneTodoLength = computed(
  () => todoStore.todos?.filter((todo) => todo.done).length
)

const canvas = ref<HTMLCanvasElement>()

const chart = ref<Chart<'pie', (number | undefined)[], string>>()

onMounted(() => {
  chart.value = new Chart(toValue(canvas)!, {
    type: 'pie',
    data: {
      labels: ['total', 'done'],
      datasets: [
        {
          data: [todoStore.todos?.length, toValue(doneTodoLength)],
          backgroundColor: ['rgba(71, 85, 105, .3)', 'rgba(71, 85, 105, .2)'],
          borderColor: ['rgba(71, 85, 105, 1)', 'rgba(71, 85, 105, 1)'], // 바의 테두리 색
          borderWidth: 1, // 테두리 두께
        },
      ],
    },
  })
})
</script>

<style></style>
