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

const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
  new Chart(toValue(canvas)!, {
    type: 'pie',
    data: {
      labels: ['Undone', 'Done'],
      datasets: [
        {
          data: [6, 4],
          backgroundColor: ['#cccccc', '#000000'],
        },
      ],
    },
  })
})
</script>

<style></style>
