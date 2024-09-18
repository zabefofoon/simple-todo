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
        <DarkModeButton class="hidden lg:flex" />
        <ChangeDisplayButton class="hidden lg:flex" />
        <NotificationButton class="hidden lg:block" />
        <template v-if="loadingStore.todoLoading">
          <Skeletor class="w-[80px] h-[24px] | ml-auto" />
          <Skeletor class="w-[80px] h-[24px]" />
        </template>
        <template v-else>
          <TodoTagSelector class="ml-auto" />
          <TodoStatusSelector class="lg:ml-2" />
        </template>
      </div>
      <div v-if="!todos?.length" class="flex | h-full">
        <Spinner v-if="loadingStore.todoLoading" class="m-auto" />
        <p
          v-else
          class="w-full | flex items-center justify-center | text-center"
          :class="storageStore.getThemeClass('', 'text-white')">
          {{ i18n.t('NoTodo') }}
        </p>
      </div>
      <template v-else>
        <div class="p-2 lg:p-4 | grid xl:grid-cols-2 gap-4">
          <template v-for="tag in settingStore.setting?.tags" :key="tag.id">
            <div
              v-if="matchedTodos(tag.label).length"
              class="mb-4 lg:mb-8 rounded-lg border"
              :class="[storageStore.getThemeClass('', 'border-slate-700'), ,]">
              <div
                class="p-2 lg:p-4 | font-bold | flex items-center gap-1.5"
                :class="storageStore.getThemeClass('', 'text-white')">
                <NuxtLink :to="`/todo/tag/${tag.id}`">
                  #{{ tag.label }}
                  <i class="icon icon-arrow-right | text-xs | mt-0.5"></i>
                </NuxtLink>
              </div>
              <div
                v-if="storageStore.display === 'thumbnail'"
                class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 | p-2 lg:p-4">
                <TodoThumbnail
                  v-for="todo in matchedTodos(tag.label)"
                  :key="todo.id"
                  :todo="todo"
                  @delete="deleteTodo"
                  @done="todoStore.doneTodo" />
              </div>
              <div
                v-else
                class="flex flex-col gap-2 | p-2 lg:p-4 | h-auto">
                <TodoRow
                  v-for="todo in matchedTodos(tag.label)"
                  :key="todo.id"
                  :todo="todo"
                  @delete="deleteTodo"
                  @done="todoStore.doneTodo" />
              </div>
            </div>
          </template>
          <div
            v-if="matchedTodos().length"
            class="mb-4 lg:mb-8 rounded-lg border"
            :class="[storageStore.getThemeClass('', 'border-slate-700')]">
            <div
              v-if="!route.query.tag"
              class="p-2 lg:p-4 | font-bold | flex items-center gap-1.5"
              :class="storageStore.getThemeClass('', 'text-white')">
              <NuxtLink :to="`/todo/tag/memo`">
                #memo
                <i class="icon icon-arrow-right | text-xs | mt-0.5"></i>
              </NuxtLink>
            </div>
            <div
              v-if="storageStore.display === 'thumbnail'"
              class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 | p-2 lg:p-4">
              <TodoThumbnail
                v-for="todo in matchedTodos()"
                :key="todo.id"
                :todo="todo"
                @delete="deleteTodo"
                @done="todoStore.doneTodo" />
            </div>
            <div
              v-else
              class="flex flex-col gap-2 | p-2 lg:p-4 | h-auto">
              <TodoRow
                v-for="todo in matchedTodos()"
                :key="todo.id"
                :todo="todo"
                @delete="deleteTodo"
                @done="todoStore.doneTodo" />
            </div>
          </div>
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
import type { Todo } from '~/models/Todo'
import { useLoadingStore } from '~/store/loading.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'
import { useSettingStore } from '~/store/setting.store'

const i18n = useI18n()

const route = useRoute()

const storageStore = useStorageStore()
const todoStore = useTodoStore()
const loadingStore = useLoadingStore()
const settingStore = useSettingStore()

const todos = computed(() => {
  let result: Todo[] | undefined = undefined
  if (route.query.filter === 'Undone')
    result = todoStore.todos?.filter((todo) => !todo.done)
  else if (route.query.filter === 'Done')
    result = todoStore.todos?.filter((todo) => todo.done)
  else result = todoStore.todos

  return route.query.tag
    ? result
        ?.filter(
          (todo) =>
            todo.tagId === route.query.tag ||
            (!todo.tag && route.query.tag === 'memo')
        )
        .sort((a, b) => b.created! - a.created!)
    : result?.sort((a, b) => b.created! - a.created!)
})

const deleteTodo = (id: number) => {
  if (confirm(i18n.t('ConfirmDelete'))) todoStore.deleteTodo(id)
}

const matchedTodos = (label?: string) => {
  return (
    todos.value?.filter(({ tag }) => tag?.label === label).slice(0, 6) ??
    todos.value?.filter(({ tag }) => !tag).slice(0, 6) ??
    []
  )
}
</script>
