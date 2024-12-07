<template>
  <div
    class="flex flex-col gap-3 | w-full min-w-[200px] | border rounded-lg | p-2 lg:p-3"
    :class="storageStore.getThemeClass('bg-white', 'border-slate-700')">
    <Skeletor v-if="loadingStore.todoLoading" class="w-1/4 h-[24px]" />
    <h3 v-else class="flex items-center">
      <span
        class="font-bold"
        :class="storageStore.getThemeClass('', 'text-white')"
        v-t="'Done'">
      </span>
      <span
        class="ml-auto | text-sm"
        :class="storageStore.getThemeClass('', 'text-white')">
        {{ isNaN(ratio) ? 0 : ratio.toFixed(1) }}%
      </span>
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

onMounted(() => {
  chart.value = new Chart(toValue(canvas)!, {
    type: 'doughnut',
    data: {
      labels: [i18n.t('Undone'), i18n.t('Done')],
      datasets: [
        {
          data: [toValue(undoneTodoLength), toValue(doneTodoLength)],
          backgroundColor: ['rgba(71, 85, 105, .3)', 'rgba(71, 85, 105, 1)'],
          borderColor: ['rgba(71, 85, 105, 1)', 'rgba(71, 85, 105, 1)'], // 바의 테두리 색
          borderWidth: 0.5, // 테두리 두께
        },
      ],
    },
    options: {
      color: storageStore.getThemeClass('', 'white'),
    },
  })
})
</script>
