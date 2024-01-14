<template>
  <div class="border | p-2 lg:p-4 ">
    <h3 class="font-bold">
      <span v-if="scheduledTodo">Scheduled Todo(2024.01.14)</span>
      <span v-else>No Scheduled</span>
    </h3>
    <p v-if="scheduledTodo?.description">
      <span v-if="scheduledTodo.description.length > 100">
        {{ scheduledTodo.description.slice(0, 100) }}...
      </span>
      <span v-else>
        {{ scheduledTodo.description }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import todoApi from '~/api/todo.api';
import { Todo } from '~/models/Todo';

const todos = ref<Todo[]>()
const getAllTodos = async () => {
  const data = await todoApi.getAllTodos()
  todos.value = Todo.map(data).sort(
    (a, b) => Number(b.created) - Number(a.created)
  )
  await Notification.requestPermission()
  navigator.serviceWorker.controller?.postMessage({
    type: 'registerTimer',
    todos: data.filter((todo) => todo.upto),
  })
}

const scheduledTodo = computed(() => {
  return toValue(todos)
    ?.filter((todo) => todo.uptoTime && todo.uptoTime > new Date().getTime())
    ?.sort((a, b) => Number(a?.uptoTime || 0) - Number(b?.uptoTime || 0))
    .slice(0, 1)
    .at(0)
})

onMounted(() => {
  getAllTodos()
})
</script>

<style></style>
