<template>
  <div class="flex flex-col gap-2 | border rounded-lg | p-2 lg:p-3">
    <div class="font-bold">
      <NuxtLink to="/todo">{{ $t('Recent') }}</NuxtLink>
    </div>
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
  </div>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

const i18n = useI18n()

const todoStore = useTodoStore()
const storageStore = useStorageStore()

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
