<template>
  <NuxtLayout name="layout-basic">
    <div
      v-if="!todoStore.todos?.length"
      class="w-full h-full | flex flex-col justify-center items-center">
      Create Todo
    </div>
    <div v-else class="flex flex-col">
      <div
        class="sticky top-0 z-20 | flex items-center gap-1 | bg-white | px-4 py-2 | border-b">
        <NuxtLink to="/search" class="w-full max-w-[50%]">
          <input
            class="w-full | px-3 py-1 | bg-slate-200 | rounded-full | text-sm"
            placeholder="Search" />
        </NuxtLink>
        <button class="flex | border p-1 | ml-auto">
          <i class="icon icon-grid text-md"></i>
        </button>
        <select class="border | bg-white | p-1 | text-xs">
          <option>All</option>
          <option>Undone</option>
          <option>Done</option>
        </select>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 | p-4">
        <TodoThumbnail
          v-for="todo in todoStore.todos"
          :key="todo.id"
          :todo="todo"
          @delete="todoStore.deleteTodo"
          @done="todoStore.doneTodo" />
      </div>
    </div>
    <template #actions>
      <ClientOnly>
        <NuxtLink
          to="/search"
          class="flex | bg-black rounded-full | text-white | p-2">
          <i class="icon icon-search text-2xl"></i>
        </NuxtLink>
        <NuxtLink
          to="/todo/new"
          class="flex | bg-black rounded-full | text-white | p-2">
          <i class="icon icon-add text-2xl"></i>
        </NuxtLink>
      </ClientOnly>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
import TodoThumbnail from '~/components/TodoThumbnail.vue'
import { useTodoStore } from '~/store/todo.store'

const todoStore = useTodoStore()
</script>
