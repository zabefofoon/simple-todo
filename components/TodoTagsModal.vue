<template>
  <UIModal
    modal-name="TodoTagsModal"
    class="ml-auto transition-all"
    :class="
      storageStore.isSNBExpanded
        ? 'lg:w-[calc(100vw-240px)]'
        : 'lg:w-[calc(100vw-52px)]'
    "
    :content-class="`border-t | w-full h-full | ${storageStore.getThemeClass(
      'bg-white',
      'bg-slate-900 | border-slate-700'
    )}`"
    overlay-class="ml-auto"
    hide-close
    :content-transition="settingStore.screen === 'lg' ? 'none' : 'slide-right'"
    @close="emit('close')">
    <HeaderInner :label="`#${matchedTag ?? 'memo'}`">
      <TodoStatusSelector class="lg:ml-2" />
    </HeaderInner>
    <div v-if="!todos?.length" class="flex | h-full">
      <Spinner v-if="loadingStore.todoLoading" class="m-auto" />
      <p
        v-else
        class="w-full | flex items-center justify-center | text-center text-theme"
        v-t="'NoTodo'"></p>
    </div>

    <div v-else class="p-2 lg:p-4 | flex flex-col gap-4 | overflow-auto">
      <div
        v-for="day in days"
        :key="day"
        class="border rounded-lg border-theme | p-2 lg:p-4">
        <div class="mb-4 | text-lg font-bold text-theme">
          {{ dayToTitle(day) }}
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-2 | h-auto">
          <TodoRow
            v-for="todo in filterTodosByDays(day)"
            :key="todo.id"
            :todo="todo" />
        </div>
      </div>
    </div>
    <nav class="fixed right-3 bottom-4 z-10 | flex flex-col gap-1">
      <FloatingButtonsSearch />
      <FloatingButtonsNew />
    </nav>
  </UIModal>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo'

import dayjs from 'dayjs'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const route = useRoute()
const i18n = useI18n()

const loadingStore = useLoadingStore()
const settingStore = useSettingStore()
const storageStore = useStorageStore()
const todoStore = useTodoStore()

const matchedTag = computed(() => {
  return settingStore.setting?.tags.find((tag) => tag.id === route.query.tags)
    ?.label
})

const todos = computed(() => {
  let result: Todo[] | undefined = undefined
  if (route.query.filter === 'Undone')
    result = todoStore.todos?.filter((todo) => !todo.done)
  else if (route.query.filter === 'Done')
    result = todoStore.todos?.filter((todo) => todo.done)
  else result = todoStore.todos

  return result
    ?.filter(
      (todo) =>
        todo.tagId === route.query.tags ||
        (!todo.tag && route.query.tags === 'memo')
    )
    .sort((a, b) => b.created! - a.created!)
})

const calculateDay = (timestamp = 0) => {
  const date = dayjs(timestamp)
  const year = date.year()
  const month = date.format('M')

  const firstDayOfMonth = date.startOf('month')
  const dayOfMonth = date.date()
  const firstDayWeekday = firstDayOfMonth.day()

  const weekOfMonth = Math.ceil((dayOfMonth + firstDayWeekday) / 7)

  return `${year}-${month}-${weekOfMonth}`
}

const days = computed(() => {
  return (
    todos.value?.reduce<string[]>((acc, current) => {
      const transformed = calculateDay(current.created)
      if (!acc.includes(transformed)) acc.push(transformed)
      return acc
    }, []) ?? []
  )
})

const filterTodosByDays = (day: string) => {
  return todos.value?.filter((todo) => calculateDay(todo.created) === day)
}

const dayToTitle = (day: string) => {
  const splited = day.slice(2).split('-')
  const year = splited[0].padStart(2, '0')
  const month = splited[1].padStart(2, '0')
  return `${year}.${month} ${i18n.t('weekOfMonth', {
    week: splited[2],
  })}`
}
</script>
