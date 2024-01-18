<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <header
        class="flex items-center gap-3 | py-2 px-4 | border | overflow-hidden">
        <button class="flex" @click="router.back()">
          <i class="icon icon-arrow-left"></i>
        </button>
        <div
          class="w-full | text-lg truncate | cursor-pointer"
          @click="router.back()">
          {{ route.params.id }}
        </div>
      </header>
    </template>

    <div class="w-full h-full">
      <div
        v-if="!todayTodos?.length"
        class="w-full h-full | flex flex-col justify-center items-center">
        Create Todo
      </div>
      <div
        v-else
        class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 | p-4">
        <TodoThumbnail
          v-for="todo in todayTodos"
          :key="todo.id"
          :todo="todo"
          @delete="todoStore.deleteTodo"
          @done="todoStore.doneTodo" />
      </div>
    </div>
    <template #actions>
      <ClientOnly>
        <NuxtLink
          :to="`/todo/new?date=${route.params.id}`"
          class="flex | bg-slate-800 rounded-full | text-white | p-2">
          <i class="icon icon-add text-2xl"></i>
        </NuxtLink>
      </ClientOnly>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useTodoStore } from '~/store/todo.store'

const route = useRoute()
const router = useRouter()

const todoStore = useTodoStore()

const todayTodos = computed(() =>
  todoStore.todos?.filter((todo) => todo.createdDate === route.params.id)
)
</script>

<style></style>
