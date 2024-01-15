<template>
  <NuxtPage />
</template>
<script setup lang="ts">
import { useScrollStore } from './store/scroll.store'
import { useTodoStore } from './store/todo.store'

const todoStore = useTodoStore()
const scrollStore = useScrollStore()

onMounted(() => {
  todoStore.getAllTodos()
  scrollStore.listenHistoryUpdate()
})
</script>
