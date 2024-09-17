<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <ClientOnly>
        <HeaderInner :label="`#${matchedTag ?? 'memo'}`">
          <TodoStatusSelector class="lg:ml-2" />
        </HeaderInner>
      </ClientOnly>
    </template>
    <div v-if="!todos?.length" class="flex | h-full">
      <Spinner v-if="loadingStore.todoLoading" class="m-auto" />
      <p
        v-else
        class="w-full | flex items-center justify-center | text-center"
        :class="storageStore.getThemeClass('', 'text-white')">
        {{ i18n.t('NoTodo') }}
      </p>
    </div>

    <div v-else class="mb-4 lg:mb-8 p-2 lg:p-4 | flex flex-col gap-4">
      <div
        v-for="day in days"
        :key="day"
        class="border rounded-lg p-2 lg:p-4"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
        <div
          class="mb-4 | text-lg font-bold"
          :class="storageStore.getThemeClass('', 'text-white')">
          {{ dayToTitle(day) }}
        </div>
        <div
          v-if="storageStore.display === 'thumbnail'"
          class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <TodoThumbnail
            v-for="todo in filterTodosByDays(day)"
            :key="todo.id"
            :todo="todo"
            @delete="deleteTodo"
            @done="todoStore.doneTodo" />
        </div>
        <div v-else class="flex flex-col gap-2 | h-auto">
          <TodoRow
            v-for="todo in filterTodosByDays(day)"
            :key="todo.id"
            :todo="todo"
            @delete="deleteTodo"
            @done="todoStore.doneTodo" />
        </div>
      </div>
    </div>
    <template #actions>
      <FloatingButtonsSearch />
      <FloatingButtonsNew />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo'
import { useLoadingStore } from '~/store/loading.store'
import { useSettingStore } from '~/store/setting.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

import dayjs from 'dayjs'

const route = useRoute()
const i18n = useI18n()

const loadingStore = useLoadingStore()
const settingStore = useSettingStore()
const storageStore = useStorageStore()
const todoStore = useTodoStore()

const matchedTag = computed(() => {
  return settingStore.setting?.tags.find((tag) => tag.id === route.params.id)
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
        todo.tagId === route.params.id ||
        (!todo.tag && route.params.id === 'memo')
    )
    .sort((a, b) => b.created! - a.created!)
})

const deleteTodo = (id: number) => {
  if (confirm(i18n.t('ConfirmDelete'))) todoStore.deleteTodo(id)
}

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
