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
        <NuxtLink class="w-full max-w-[50%] | relative" to="/search">
          <input
            class="w-full | px-3 py-1 | bg-slate-200 | rounded-full | text-sm"
            :placeholder="$t('Search')" />
          <i
            class="icon icon-search | text-xl | absolute right-1 top-1/2 -translate-y-1/2"></i>
        </NuxtLink>
        <NotificationButton class="hidden lg:block" />
        <select
          class="border | bg-white | p-1 ml-auto | text-xs"
          :value="route.query.filter || 'All'"
          @change="changeFilter">
          <option value="All">{{ $t('All') }}</option>
          <option value="Undone">{{ $t('Undone') }}</option>
          <option value="Done">{{ $t('Done') }}</option>
        </select>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 | p-4">
        <TodoThumbnail
          v-for="todo in todos"
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
          class="flex | bg-slate-800 rounded-full | text-white | p-2">
          <i class="icon icon-search text-2xl text-white"></i>
        </NuxtLink>
        <NuxtLink
          to="/todo/new"
          class="flex | bg-slate-800 rounded-full | text-white | p-2">
          <i class="icon icon-add text-2xl text-white"></i>
        </NuxtLink>
      </ClientOnly>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import TodoThumbnail from '~/components/TodoThumbnail.vue'
import { useTodoStore } from '~/store/todo.store'

const router = useRouter()
const route = useRoute()

const todoStore = useTodoStore()

const todos = computed(() => {
  if (route.query.filter === 'Undone') {
    return todoStore.todos?.filter((todo) => !todo.done)
  } else if (route.query.filter === 'Done') {
    return todoStore.todos?.filter((todo) => todo.done)
  } else {
    return todoStore.todos
  }
})

const changeFilter = (event: Event) => {
  const value = (<HTMLSelectElement>event.target).value

  if (value === 'All') router.replace({ query: { filter: undefined } })
  else if (value === 'Undone') router.replace({ query: { filter: 'Undone' } })
  else if (value === 'Done') router.replace({ query: { filter: 'Done' } })
}
</script>
