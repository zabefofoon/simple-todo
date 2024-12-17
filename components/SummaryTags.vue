<template>
  <div
    class="flex flex-col gap-3 | w-full min-w-[200px] | bg-theme-3 | text-theme">
    <div class="border border-theme rounded-lg | flex-1 | p-4">
      <div
        v-if="!loadingStore.todoLoading"
        class="flex flex-col justify-center items-center | h-full">
        <div
          class="w-fit | aspect-square rounded-full | flex | p-1 lg:p-1.5 mb-1"
          :style="{ background: levelData[level].color }">
          <i class="icon icon-badge | lg:text-lg text-slate-600"></i>
        </div>
        <p class="text-lg lg:text-xl font-bold | mb-2">
          {{ levelData[level].title }}
        </p>
        <p class="text-sm lg:text-md mb-3">
          {{ levelData[level].description }}
        </p>
        <p v-if="levelData[level + 1]" class="text-xs opacity-70">
          {{
            i18n.t('NextLevel', {
              title: levelData[level + 1].title,
              n: leftTask,
            })
          }}
        </p>
      </div>
      <div
        v-else
        class="flex flex-col gap-[12px] items-center justify-center | h-full">
        <Skeletor class="w-[80%] | h-[24px]" />
        <Skeletor class="w-[30%] | h-[24px]" />
        <Skeletor class="w-[60%] | h-[24px]" />
      </div>
    </div>
    <div class="border border-theme rounded-lg | flex-1 | p-4">
      <div
        v-if="!loadingStore.todoLoading"
        class="flex flex-col justify-center items-center | h-full">
        <div class="flex items-center | mb-2">
          <div
            class="w-fit | aspect-square rounded-full | flex | p-1 lg:p-1.5 mr-3"
            :class="comparePrevWeek > 0 ? 'bg-red-500' : 'bg-blue-500'">
            <i class="icon icon-thumb | text-sm lg:text-md text-white"></i>
          </div>
          <div class="text-lg lg:text-xl font-bold | mr-1">
            {{ i18n.t('Nth', { n: Math.abs(comparePrevWeek) }) }}
          </div>
          <i v-if="comparePrevWeek > 0" class="icon icon-arrow-top"></i>
          <i v-else-if="comparePrevWeek < 0" class="icon icon-arrow-down"></i>
        </div>
        <p
          v-if="comparePrevWeek > 0"
          class="text-sm lg:text-md"
          v-t="'WeekCompareUp'"></p>
        <p
          v-else
          class="text-sm lg:text-md text-center"
          v-t="'WeekCompareDown'"></p>
      </div>
      <div
        v-else
        class="flex flex-col gap-[12px] items-center justify-center | h-full">
        <Skeletor class="w-[80%] | h-[24px]" />
        <Skeletor class="w-[30%] | h-[24px]" />
        <Skeletor class="w-[60%] | h-[24px]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

const todoStore = useTodoStore()
const loadingStore = useLoadingStore()

const i18n = useI18n()

const levelData = [
  {
    title: 'Lv 1. Newbie',
    description: i18n.t('Lv1Desc'),
    condition: 0,
    color: '#fef08a',
  },
  {
    title: 'Lv 2. Starter',
    description: i18n.t('Lv2Desc'),
    condition: 10,
    color: '#bbf7d0',
  },
  {
    title: 'Lv 3. Planner',
    description: i18n.t('Lv3Desc'),
    next: 30,
    color: '#bfdbfe',
  },
  {
    title: 'Lv 4. Hard Worker',
    description: i18n.t('Lv4Desc'),
    condition: 70,
    color: '#fecaca',
  },
  {
    title: 'Lv 5. Todo Master',
    description: i18n.t('Lv5Desc'),
    condition: 150,
    color: '#ddd6fe',
  },
]

const level = computed(() => {
  const todoLength = todoStore.todos?.length ?? 0
  if (todoLength < 10) return 0
  else if (todoLength < 30) return 1
  else if (todoLength < 70) return 2
  else if (todoLength < 150) return 3
  else return 4
})

const leftTask = computed(() => {
  const condition = levelData[level.value + 1].condition ?? 0
  const length = todoStore.todos?.length ?? 0
  return condition - length
})

const comparePrevWeek = computed(() => {
  const todos = todoStore.todos ?? []
  const today = dayjs()
  const startOfWeek = today.startOf('week') // 이번 주 시작
  const endOfWeek = today.endOf('week') // 이번 주 끝
  const startOfLastWeek = startOfWeek.subtract(1, 'week') // 지난주 시작
  const endOfLastWeek = startOfWeek.subtract(1, 'second') // 지난주 끝

  const lastWeekCount = todos.filter((todo) =>
    dayjs(todo.created).isBetween(startOfLastWeek, endOfLastWeek, 'day', '[]')
  ).length

  const thisWeekCount = todos.filter((todo) =>
    dayjs(todo.created).isBetween(startOfWeek, endOfWeek, 'day', '[]')
  ).length

  return thisWeekCount - lastWeekCount
})
</script>
