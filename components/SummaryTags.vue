<template>
  <div
    class="flex flex-col gap-3 | w-full min-w-[200px] | border rounded-lg | p-2 lg:p-3"
    :class="storageStore.getThemeClass('bg-white', 'border-slate-700')">
    <div class="font-bold">
      <Skeletor v-if="loadingStore.todoLoading" class="w-1/4 h-[24px]" />
      <span v-else :class="storageStore.getThemeClass('', 'text-white')">
        {{ i18n.t('Tags') }}
      </span>
    </div>
    <div
      v-show="loadingStore.todoLoading"
      class="w-full aspect-video lg:aspect-square | flex items-center justify-center">
      <Spinner />
    </div>
    <div
      v-show="!loadingStore.todoLoading"
      class="h-full lg:max-h-[75%] | my-auto | flex items-center justify-center">
      <canvas ref="canvas" width="100%"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto'
import { useLoadingStore } from '~/store/loading.store'
import { useSettingStore } from '~/store/setting.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

const i18n = useI18n()

const todoStore = useTodoStore()
const settingStore = useSettingStore()
const loadingStore = useLoadingStore()
const storageStore = useStorageStore()

const canvas = ref<HTMLCanvasElement>()

const tagLength = computed(() => {
  const result =
    settingStore.setting?.tags.reduce<Record<string, number>>(
      (acc, current) => {
        acc[current.label] =
          todoStore.todos?.filter((todo) => todo.tagId === current.id).length ||
          0
        return acc
      },
      {}
    ) || {}

  return Object.entries(result)
    .sort(([, countA], [, countB]) => countB - countA)
    .reduce<Record<string, number>>((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
})

const doneLengthByTag = computed(() => {
  return Object.keys(toValue(tagLength)).flatMap(
    (key) =>
      todoStore.todos
        ?.filter((todo) => todo.tag?.label === key)
        .filter((todo) => todo.done).length
  )
})

const undoneLengthByTag = computed(() => {
  return Object.keys(toValue(tagLength)).flatMap(
    (key) =>
      todoStore.todos
        ?.filter((todo) => todo.tag?.label === key)
        .filter((todo) => !todo.done).length
  )
})

onMounted(() => {
  new Chart(toValue(canvas)!, {
    type: 'bar',
    data: {
      labels: Object.keys(toValue(tagLength))
        .map((key) => `#${key}`)
        .slice(0, 3),
      datasets: [
        {
          label: i18n.t('Undone'),
          backgroundColor: 'rgba(71, 85, 105, .3)',
          borderColor: 'rgba(71, 85, 105, 1)',
          borderWidth: 1,
          data: toValue(undoneLengthByTag).slice(0, 3),
        },
        {
          label: i18n.t('Done'),
          backgroundColor: 'rgba(71, 85, 105, 1)',
          borderColor: 'rgba(71, 85, 105, 1)',
          borderWidth: 1,
          data: toValue(doneLengthByTag).slice(0, 3),
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
