<template>
  <div class="flex flex-col gap-2 | border | p-2 lg:p-3">
    <div class="font-bold">Recent</div>
    <div
      v-if="todoStore.todos?.length"
      class="grid grid-cols-2 lg:grid-cols-4 gap-2">
      <TodoThumbnail
        v-for="todo in recentTodos"
        :key="todo.id"
        :todo="todo"
        hide-delete
        @done="todoStore.doneTodo" />
    </div>
    <p v-else class="text-center py-10">No Todos.</p>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '~/store/todo.store'

const todoStore = useTodoStore()

const recentTodos = computed(() => {
  return todoStore.todos
    ?.sort((a, b) => Number(b.modified) - Number(a.modified))
    .slice(0, 4)
})
</script>

<style></style>
