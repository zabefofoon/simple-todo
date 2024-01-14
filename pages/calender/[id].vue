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
          @delete="deleteTodo"
          @done="doneTodo" />
      </div>
    </div>
    <template #actions>
      <ClientOnly>
        <NuxtLink
          :to="`/todo/new?date=${route.params.id}`"
          class="flex | bg-black rounded-full | text-white | p-2">
          <i class="icon icon-add text-2xl"></i>
        </NuxtLink>
      </ClientOnly>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import todoApi from '~/api/todo.api'
import { Todo } from '~/models/Todo'

const route = useRoute()
const router = useRouter()

const todos = ref<Todo[]>()
const todayTodos = computed(() =>
  toValue(todos)?.filter((todo) => todo.createdDate === route.params.id)
)
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

const deleteTodo = async (id: number) => {
  await todoApi.deleteTodo(id)
  getAllTodos()
}

const doneTodo = async (id: number, done?: boolean) => {
  await todoApi.updateTodo(id, {done: !done})
  getAllTodos()
}


onMounted(() => {
  getAllTodos()
})
</script>

<style></style>
