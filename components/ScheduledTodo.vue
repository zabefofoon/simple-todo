<template>
  <div class="flex flex-col gap-2 | border | p-2 lg:p-4">
    <h3 class="font-bold">
      <span v-if="scheduledTodo">Scheduled Todo({{ scheduledTodo.date }})</span>
      <span v-else>No Scheduled</span>
    </h3>
    <NuxtLink
      v-if="scheduledTodo?.description"
      :to="`/todo/${scheduledTodo.id}`">
      <p>
        <span v-if="scheduledTodo.description.length > 100">
          {{ scheduledTodo.description.slice(0, 100) }}...
        </span>
        <span v-else>
          {{ scheduledTodo.description }}
        </span>
      </p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '~/store/todo.store';

const todoStore = useTodoStore()

const scheduledTodo = computed(() => {
  return todoStore.todos
    ?.filter((todo) => todo.uptoTime && todo.uptoTime > new Date().getTime())
    ?.sort((a, b) => Number(a?.uptoTime || 0) - Number(b?.uptoTime || 0))
    .slice(0, 1)
    .at(0)
})
</script>

<style></style>
