<template>
  <NuxtLayout name="layout-basic">
    <div
      v-if="!todos?.length"
      class="w-full h-full | flex flex-col justify-center items-center">
      Create Todo
    </div>
    <div v-else class="flex flex-col">
      <div
        class="sticky top-0 z-10 | flex items-center gap-1 | bg-white | px-4 py-2 | border">
        <input
          class="w-full max-w-[50%] | px-3 py-1 | bg-slate-200 | rounded-full | text-sm"
          placeholder="Search" />
        <button class="flex | border p-1 | ml-auto">
          <i class="icon icon-grid text-md"></i>
        </button>
        <select class="border | bg-white | p-1 | text-xs">
          <option>All</option>
          <option>Day</option>
          <option>Weekend</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 | p-4">
        <TodoThumbnail
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @delete="deleteTodo" 
          @done="doneTodo"/>
      </div>
    </div>
    <template #actions>
      <ClientOnly>
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
import type { RouteLocationNormalized } from 'vue-router'
import todoApi from '~/api/todo.api'
import TodoThumbnail from '~/components/TodoThumbnail.vue'
import { Todo } from '~/models/Todo'
import { useScrollStore } from '~/store/scroll.store'

const router = useRouter()
const scrollStore = useScrollStore()

const todos = ref<Todo[]>()

const saveScrollTop = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  if (from.name === 'index' && to.name === 'id') {
    const scrollTop = document.getElementById('scroll-area')?.scrollTop || 0
    scrollStore.saveScrollTop(scrollTop)
  }
}

const moveToSavedScrollPosition = () => {
  if (`${router.options.history.state.forward}`.match(/\/\d+/)) {
    const scrollArea = document.getElementById('scroll-area')
    scrollArea?.scrollTo({ top: scrollStore.savedScrollTop })
    scrollStore.saveScrollTop(0)
  }
}

onBeforeRouteLeave((to, from, next) => {
  saveScrollTop(to, from)
  next()
})

const getAllTodos = async () => {
  const data = await todoApi.getAllTodos()
  console.log(Todo.map(data))
  todos.value = Todo.map(data).sort(
    (a, b) => Number(b.created) - Number(a.created)
  )
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
  moveToSavedScrollPosition()
  getAllTodos()
})
</script>
