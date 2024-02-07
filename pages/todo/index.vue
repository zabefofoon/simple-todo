<template>
  <NuxtLayout name="layout-basic">
    <div class="flex flex-col | h-full">
      <div
        class="sticky top-0 z-20 | flex items-center gap-1 | bg-white | px-4 py-2 | border-b">
        <NuxtLink class="w-full lg:w-[50%] mr-2 | relative" to="/search">
          <input
            class="w-full | px-3 py-1 | bg-slate-200 | rounded-full | text-sm"
            :placeholder="$t('Search')" />
          <i
            class="icon icon-search | text-xl | absolute right-1 top-1/2 -translate-y-1/2"></i>
        </NuxtLink>
        <NotificationButton class="hidden lg:block" />
        <div class="ml-auto | relative">
          <label
            for="filter"
            class="absolute top-0 left-0 -translate-y-1/2 | text-[8px] lg:text-[10px] | bg-white">
            {{ $t('Tag') }}
          </label>
          <select
            id="filter"
            class="border | bg-white | px-1 py-0.5 | text-xs"
            :value="route.query.tag || 'All'"
            @change="changeTag">
            <option value="All">{{ $t('All') }}</option>
            <option
              v-for="tag in settingStore.setting?.tags"
              :key="tag.id"
              :value="tag.id">
              {{ tag.label }}
            </option>
          </select>
        </div>
        <div class="lg:ml-2 | relative">
          <label
            for="filter"
            class="absolute top-0 left-0 -translate-y-1/2 | text-[8px] lg:text-[10px] | bg-white">
            {{ $t('Filter') }}
          </label>
          <select
            id="filter"
            class="border | bg-white | px-1 py-0.5 | text-xs"
            :value="route.query.filter || 'All'"
            @change="changeFilter">
            <option value="All">{{ $t('All') }}</option>
            <option value="Undone">{{ $t('Undone') }}</option>
            <option value="Done">{{ $t('Done') }}</option>
          </select>
        </div>
      </div>
      <template v-if="storageStore.display === 'thumbnail'">
        <p
          v-if="!todos?.length"
          class="w-full h-full | flex items-center justify-center | text-center">
          {{ $t('NoTodo') }}
        </p>
        <div
          v-else
          class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 | p-4">
          <TodoThumbnail
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @delete="deleteTodo"
            @done="todoStore.doneTodo" />
        </div>
      </template>
      <div v-else class="flex flex-col gap-2 | p-4 | lg:w-[96%]">
        <TodoRow
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @delete="deleteTodo"
          @done="todoStore.doneTodo" />
        <p v-if="!todos?.length" class="text-center py-10">
          {{ $t('NoTodo') }}
        </p>
      </div>
    </div>
    <template #actions>
      <ClientOnly>
        <NuxtLink
          to="/search"
          class="flex | bg-slate-800 rounded-full | text-white | p-2">
          <i class="icon icon-search text-2xl text-white"></i>
        </NuxtLink>
        <NuxtLink
          to="/todo/new"
          class="flex | bg-slate-800 rounded-full | text-white | p-2">
          <i class="icon icon-add text-2xl text-white"></i>
        </NuxtLink>
      </ClientOnly>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import TodoThumbnail from '~/components/TodoThumbnail.vue'
import type { Todo } from '~/models/Todo'
import { useSettingStore } from '~/store/setting.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

const i18n = useI18n()

const router = useRouter()
const route = useRoute()

const settingStore = useSettingStore()
const storageStore = useStorageStore()
const todoStore = useTodoStore()

const todos = computed(() => {
  let result: Todo[] | undefined = undefined
  if (route.query.filter === 'Undone')
    result = todoStore.todos
      ?.sort((a, b) => (b?.created || 0) - (a?.created || 0))
      .filter((todo) => !todo.done)
  else if (route.query.filter === 'Done')
    result = todoStore.todos
      ?.sort((a, b) => (b?.created || 0) - (a?.created || 0))
      .filter((todo) => todo.done)
  else
    result = todoStore.todos?.sort(
      (a, b) => (b?.created || 0) - (a?.created || 0)
    )

  return route.query.tag
    ? result?.filter((todo) => todo.tagId === route.query.tag)
    : result
})

const changeFilter = (event: Event) => {
  const value = (<HTMLSelectElement>event.target).value

  if (value === 'All')
    router.replace({ query: { ...route.query, filter: undefined } })
  else if (value === 'Undone')
    router.replace({ query: { ...route.query, filter: 'Undone' } })
  else if (value === 'Done')
    router.replace({ query: { ...route.query, filter: 'Done' } })
}

const changeTag = (event: Event) => {
  const value = (<HTMLSelectElement>event.target).value

  if (value === 'All')
    router.replace({ query: { ...route.query, tag: undefined } })
  else router.replace({ query: { ...route.query, tag: value } })
}

const deleteTodo = (id: number) => {
  if (confirm(i18n.t('ConfirmDelete'))) todoStore.deleteTodo(id)
}
</script>
