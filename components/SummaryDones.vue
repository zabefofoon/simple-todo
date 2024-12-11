<template>
  <div
    class="relative | flex flex-col gap-3 | w-full min-w-[200px] | border rounded-lg | p-4"
    :class="storageStore.getThemeClass('bg-white', 'border-slate-700')">
    <h3
      v-if="!loadingStore.todoLoading"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | w-full h-full | flex flex-col items-center justify-center"
      :class="storageStore.getThemeClass('', 'text-white')">
      <p class="text-[12vw] lg:text-[2.5cqw]">
        {{ isNaN(ratio) ? 0 : ratio.toFixed(1) }}%
      </p>
      <p class="text-[4vw] lg:text-[.8cqw]">
        {{
          i18n.t('SummaryDoughnut', { total: todoLength, done: doneTodoLength })
        }}
      </p>
    </h3>
    <div
      v-show="loadingStore.todoLoading"
      class="w-full aspect-square | flex items-center justify-center">
      <Spinner class="m-auto" />
    </div>
    <canvas
      v-show="!loadingStore.todoLoading"
      ref="canvas"
      width="100%"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'

const i18n = useI18n()

const loadingStore = useLoadingStore()
const todoStore = useTodoStore()
const storageStore = useStorageStore()

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

watch(canvas, async () => {
  if (!canvas.value) return

  Chart.register(ChartDataLabels)
  chart.value = new Chart(canvas.value!, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [doneTodoLength.value, undoneTodoLength.value],
          backgroundColor: [
            'rgba(74, 222, 128, .7)',
            storageStore.getThemeClass(
              'rgba(71, 85, 105, .2)',
              'rgba(71, 85, 105, .8)'
            ),
          ],
          borderColor: [
            'rgba(74, 222, 128, 1)',
            storageStore.getThemeClass(
              'rgba(71, 85, 105, .2)',
              'rgba(71, 85, 105, .8)'
            ),
          ], // 바의 테두리 색
          borderWidth: 0.5, // 테두리 두께
        },
      ],
    },

    options: {
      cutout: '92%',
      color: storageStore.getThemeClass('', 'white'),
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        datalabels: {
          display: false,
        },
      },
    },
  })
})
</script>
