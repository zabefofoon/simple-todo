<template>
  <NuxtLayout name="layout-basic">
    <div class="h-full | flex flex-col">
      <div
        class="sticky top-0 z-10 | flex items-center gap-1 | bg-white | px-4 py-2 | border-b">
        <input
          class="w-full max-w-[50%] | px-3 py-1 | bg-slate-200 | rounded-full | text-sm"
          placeholder="Search" />
      </div>
      <div class="h-full | flex flex-col lg:flex-row gap-4  | p-2 lg:p-4">
        <div class="w-full | flex">
          <div class="w-full | flex flex-col gap-4">
            <ScheduledTodo />
            <RecentTodos />
            <div class="flex gap-2">
              <div class="w-full | border | p-2 lg:p-4">
                <div class="font-bold">Done</div>
              </div>
              <div class="w-full | border | p-2 lg:p-4">
                <div class="font-bold">Tags</div>
              </div>
              <div class="w-full | border | p-2 lg:p-4">
                <div class="font-bold">Year</div>
                <div>12개월 동안 한달에 몇개 Todo</div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex-shrink-0 | lg:min-w-[300px] lg:w-[20vw] h-full | p-2 lg:p-4 | border">
          <div class="font-bold">Calender</div>
        </div>
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
import todoApi from '~/api/todo.api'
import { Todo } from '~/models/Todo'

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

onMounted(() => {
  getAllTodos()
})
</script>

<style></style>
