<template>
  <div class="flex flex-col gap-3 | w-full min-w-[200px] | border | p-2 lg:p-3">
    <div class="font-bold">Tags</div>
    <div class="h-full | flex items-center justify-center">
      <canvas ref="canvas" width="100%"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto'

const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
  new Chart(toValue(canvas)!, {
    type: 'bar',
    data: {
      labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
      datasets: [
        {
          label: 'Data Set',
          data: [25, 10, 30, 15],
          backgroundColor: 'rgba(0, 0, 0, 0.2)', // 바의 배경색
          borderColor: 'rgba(0, 0, 0, 1)', // 바의 테두리 색
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
