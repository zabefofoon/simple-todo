<template>
  <NuxtLayout name="layout-basic">
    <div class="flex flex-col | h-full">
      <div
        class="sticky top-0 z-20 | flex items-center gap-1 | px-4 py-2 | border-b"
        :class="
          storageStore.getThemeClass(
            'bg-white',
            'bg-slate-900 border-slate-700'
          )
        ">
        <SearchInputButton />
        <NotificationButton class="hidden lg:block" />
        <template v-if="loadingStore.todoLoading">
          <Skeletor class="w-[80px] h-[24px] | ml-auto" />
          <Skeletor class="w-[80px] h-[24px]" />
        </template>
        <template v-else>
          <div class="ml-auto | relative">
            <label
              for="filter"
              class="absolute top-0 left-0 -translate-y-1/2 | text-[8px] lg:text-[10px]"
              :class="
                storageStore.getThemeClass(
                  'bg-white',
                  'bg-slate-900 text-white'
                )
              ">
              {{ $t('Tag') }}
            </label>
            <select
              id="filter"
              class="border rounded-md | px-1 py-0.5 | text-xs"
              :class="
                storageStore.getThemeClass(
                  'bg-white',
                  'dark | bg-slate-900 text-white | border-slate-700'
                )
              "
              :value="route.query.tag || 'All'"
              @change="changeTag">
              <option
                :class="storageStore.getThemeClass('', 'text-white')"
                value="All">
                {{ $t('All') }}
              </option>
              <option
                v-for="tag in settingStore.setting?.tags"
                :key="tag.id"
                :class="storageStore.getThemeClass('', 'text-white')"
                :value="tag.id">
                {{ tag.label }}
              </option>
            </select>
          </div>
          <div class="lg:ml-2 | relative">
            <label
              for="filter"
              class="absolute top-0 left-0 -translate-y-1/2 | text-[8px] lg:text-[10px]"
              :class="
                storageStore.getThemeClass(
                  'bg-white',
                  'bg-slate-900 text-white'
                )
              ">
              {{ $t('Filter') }}
            </label>
            <select
              id="filter"
              class="border rounded-md | px-1 py-0.5 | text-xs"
              :class="
                storageStore.getThemeClass(
                  'bg-white',
                  'dark | bg-slate-900 text-white | border-slate-700'
                )
              "
              :value="route.query.filter || 'All'"
              @change="changeFilter">
              <option
                :class="storageStore.getThemeClass('', 'text-white')"
                value="All">
                {{ $t('All') }}
              </option>
              <option
                :class="storageStore.getThemeClass('', 'text-white')"
                value="Undone">
                {{ $t('Undone') }}
              </option>
              <option
                :class="storageStore.getThemeClass('', 'text-white')"
                value="Done">
                {{ $t('Done') }}
              </option>
            </select>
          </div>
        </template>
      </div>
      <div v-if="!todos?.length" class="flex | h-full">
        <Spinner v-if="loadingStore.todoLoading" class="m-auto" />
        <p
          v-else
          class="w-full | flex items-center justify-center | text-center"
          :class="storageStore.getThemeClass('', 'text-white')">
          {{ $t('NoTodo') }}
        </p>
      </div>
      <template v-else>
        <div
          v-if="storageStore.display === 'thumbnail'"
          class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 | p-4">
          <TodoThumbnail
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @delete="deleteTodo"
            @done="todoStore.doneTodo" />
        </div>
        <div v-else class="flex flex-col gap-2 | p-4 | lg:w-[96%] h-auto">
          <TodoRow
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @delete="deleteTodo"
            @done="todoStore.doneTodo" />
        </div>
      </template>
    </div>
    <template #actions>
      <FloatingButtonsSearch />
      <FloatingButtonsNew />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import TodoThumbnail from '~/components/TodoThumbnail.vue'
import type { Todo } from '~/models/Todo'
import { useLoadingStore } from '~/store/loading.store'
import { useSettingStore } from '~/store/setting.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

const i18n = useI18n()

const router = useRouter()
const route = useRoute()

const settingStore = useSettingStore()
const storageStore = useStorageStore()
const todoStore = useTodoStore()
const loadingStore = useLoadingStore()

const todos = computed(() => {
  let result: Todo[] | undefined = undefined
  if (route.query.filter === 'Undone')
    result = todoStore.todos?.filter((todo) => !todo.done)
  else if (route.query.filter === 'Done')
    result = todoStore.todos?.filter((todo) => todo.done)
  else result = todoStore.todos

  return route.query.tag
    ? result
        ?.filter((todo) => todo.tagId === route.query.tag)
        .sort((a, b) => b.created! - a.created!)
    : result?.sort((a, b) => b.created! - a.created!)
})

const changeFilter = (event: Event) => {
  const value = (<HTMLSelectElement>event.target).value
  let filter = undefined
  if (value === 'All') filter = undefined
  else if (value === 'Undone') filter = 'Undone'
  else if (value === 'Done') filter = 'Done'

  router.replace({ query: { ...route.query, filter } })
}

const changeTag = (event: Event) => {
  const value = (<HTMLSelectElement>event.target).value
  const tag = value === 'All' ? undefined : value
  router.replace({ query: { ...route.query, tag } })
}

const deleteTodo = (id: number) => {
  if (confirm(i18n.t('ConfirmDelete'))) todoStore.deleteTodo(id)
}
</script>
