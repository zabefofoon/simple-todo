<template>
  <div
    class="flex flex-col gap-3 | w-full min-w-[200px] | border rounded-lg | p-2 lg:p-3">
    <h3 class="font-bold">{{ $t('Done') }}</h3>
    <div class="relative">
      <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <h3 class="absolute top-0 left-1/2 -translate-x-1/2 | text-xl">
          {{ isNaN(ratio) ? 0 : ratio }}%
        </h3>
      </div>
      <canvas ref="canvas" width="100%"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import { useTodoStore } from '~/store/todo.store'

const todoStore = useTodoStore()

const canvas = ref<HTMLCanvasElement>()

const todoLength = computed(() => todoStore.todos?.length || 0)
const undoneTodoLength = computed(
  () => todoStore.todos?.filter((todo) => !todo.done).length || 0
)
const doneTodoLength = computed(
  () => todoStore.todos?.filter((todo) => todo.done).length || 0
)

const ratio = computed(
  () => (toValue(doneTodoLength) / toValue(todoLength)) * 100
)

const chart = ref<Chart<'doughnut', (number | undefined)[], string>>()

onMounted(() => {
  chart.value = new Chart(toValue(canvas)!, {
    type: 'doughnut',
    data: {
      labels: ['total', 'done'],
      datasets: [
        {
          data: [toValue(undoneTodoLength), toValue(doneTodoLength)],
          backgroundColor: ['rgba(71, 85, 105, .3)', 'rgba(71, 85, 105, .2)'],
          borderColor: ['rgba(71, 85, 105, 1)', 'rgba(71, 85, 105, 1)'], // 바의 테두리 색
          borderWidth: 0.5, // 테두리 두께
        },
      ],
    },
  })
})
</script>

<style></style>
