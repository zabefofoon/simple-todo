<template>
  <div
    class="flex flex-col gap-2 | border rounded-lg | p-2 lg:p-3"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <div class="font-bold">
      <Skeletor v-if="loadingStore.todoLoading" class="w-1/4 h-[24px]" />
      <NuxtLink
        v-else
        to="/todo"
        :class="storageStore.getThemeClass('', 'text-white')">
        {{ $t('Recent') }}
      </NuxtLink>
    </div>
    <template v-if="loadingStore.todoLoading">
      <div
        v-if="storageStore.display === 'thumbnail'"
        class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <Skeletor v-for="index in 4" :key="index" class="aspect-square" />
      </div>
      <div v-else class="flex flex-col gap-2">
        <Skeletor v-for="index in 4" :key="index" class="h-[40px]" />
      </div>
    </template>
    <template v-else>
      <div
        v-if="storageStore.display === 'thumbnail'"
        class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <TodoThumbnail
          v-for="todo in recentTodos"
          :key="todo.id"
          :todo="todo"
          @delete="deleteTodo"
          @done="todoStore.doneTodo" />
      </div>
      <div v-else class="flex flex-col gap-2">
        <TodoRow
          v-for="todo in recentTodos"
          :key="todo.id"
          :todo="todo"
          @delete="deleteTodo"
          @done="todoStore.doneTodo" />
        <p v-if="!recentTodos?.length" class="text-center py-10">
          {{ $t('NoTodo') }}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from '~/store/loading.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

const i18n = useI18n()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const loadingStore = useLoadingStore()

const recentTodos = computed(() =>
  todoStore.todos
    ?.sort((a, b) => Number(b.modified) - Number(a.modified))
    .slice(0, 4)
)

const deleteTodo = (id: number) => {
  if (confirm(i18n.t('ConfirmDelete'))) todoStore.deleteTodo(id)
}
</script>

<style></style>
