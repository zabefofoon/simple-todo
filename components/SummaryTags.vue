<template>
  <div
    class="flex flex-col gap-3 | w-full min-w-[200px] | border rounded-lg | p-2 lg:p-3">
    <div class="font-bold">{{ $t('Tags') }}</div>
    <div class="h-full | flex items-center justify-center">
      <canvas ref="canvas" width="100%"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import { useSettingStore } from '~/store/setting.store'
import { useTodoStore } from '~/store/todo.store'

const canvas = ref<HTMLCanvasElement>()

const todoStore = useTodoStore()
const settingStore = useSettingStore()

const tagLength = computed(() => {
  return (
    settingStore.setting?.tags.reduce<Record<string, number>>(
      (acc, current) => {
        acc[current.label] =
          todoStore.todos?.filter((todo) => todo.tagId === current.id).length ||
          0
        return acc
      },
      {}
    ) || {}
  )
})

const doneLengthByTag = computed(
  () =>
    settingStore.setting?.tags.flatMap(
      (tag) =>
        todoStore.todos
          ?.filter((todo) => todo.done)
          .filter((todo) => todo.tagId === tag.id).length || 0
    ) || []
)

const undoneLengthByTag = computed(
  () =>
    settingStore.setting?.tags.flatMap(
      (tag) =>
        todoStore.todos
          ?.filter((todo) => !todo.done)
          .filter((todo) => todo.tagId === tag.id).length || 0
    ) || []
)

onMounted(() => {
  new Chart(toValue(canvas)!, {
    type: 'bar',
    data: {
      labels: Object.keys(toValue(tagLength)).map((key) => `#${key}`),
      datasets: [
        {
          label: 'Undone',
          backgroundColor: 'rgba(71, 85, 105, .3)',
          borderColor: 'rgba(71, 85, 105, 1)',
          borderWidth: 1,
          data: toValue(undoneLengthByTag),
        },
        {
          label: 'Done',
          backgroundColor: 'rgba(34, 197, 94, .4)',
          borderColor: 'rgba(71, 85, 105, 1)',
          borderWidth: 1,
          data: toValue(doneLengthByTag),
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
