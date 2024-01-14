<template>
  <div class="border | p-2 lg:p-4">
    <div class="font-bold">Recent</div>
    <div v-if="todos?.length" class="grid grid-cols-2 lg:grid-cols-4 gap-2">
      <TodoThumbnail
        v-for="todo in todos?.slice(0, 4)"
        :key="todo.id"
        :todo="todo"
        hide-delete
        @done="doneTodo" />
    </div>
    <p v-else class="text-center py-10">
        No Todos.
    </p>
  </div>
</template>

<script setup lang="ts">
import todoApi from '~/api/todo.api'
import { Todo } from '~/models/Todo'

const todos = ref<Todo[]>()
const getAllTodos = async () => {
  const data = await todoApi.getAllTodos()
  todos.value = Todo.map(data).sort(
    (a, b) => Number(b.modified) - Number(a.modified)
  )
  await Notification.requestPermission()
  navigator.serviceWorker.controller?.postMessage({
    type: 'registerTimer',
    todos: data.filter((todo) => todo.upto),
  })
}

const doneTodo = async (id: number, done?: boolean) => {
  await todoApi.updateTodo(id, { done: !done })
  getAllTodos()
}
onMounted(() => {
  getAllTodos()
})
</script>

<style></style>
