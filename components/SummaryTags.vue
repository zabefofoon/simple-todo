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

const tagColors = computed(() => {
  return (
    settingStore.setting?.tags.reduce<Record<string, string>>(
      (acc, current) => {
        acc[current.label] = `rgba(${current.color}, .5)`

        return acc
      },
      {}
    ) || {}
  )
})

onMounted(() => {
  new Chart(toValue(canvas)!, {
    type: 'bar',
    data: {
      labels: Object.keys(toValue(tagLength)),
      datasets: [
        {
          data: Object.values(toValue(tagLength)),
          backgroundColor: ['rgba(71, 85, 105, 0.2)'],
          borderColor: Object.values(toValue(tagColors)),
          borderWidth: 1
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
