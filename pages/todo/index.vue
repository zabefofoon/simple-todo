<template>
  <NuxtLayout name="layout-basic">
    <div
      v-if="!todos.length"
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
        <NuxtLink
          v-for="(todo, index) in todos"
          :key="index"
          :to="`/todo/${index}`">
          <figure
            class="relative | w-full aspect-square overflow-hidden | p-2 | border">
            <div class="truncate-4 | text-lg">
              8-1에서 회의, Simple Todo 리뷰(Rowan, Saang), 8-1에서 회의, Simple
              Todo 리뷰(Rowan, Saang), 8-1에서 회의, Simple Todo 리뷰(Rowan,
              Saang)
            </div>
            <figcaption
              class="w-full | absolute bottom-0 left-0 | p-1 | text-xs | border | bg-white">
              2024-01-07
            </figcaption>
          </figure>
        </NuxtLink>
      </div>
    </div>
    <template #actions>
      <ClientOnly>
        <NuxtLink
          :to="`/todo/${generateUniqueId()}`"
          class="flex | bg-black rounded-full | text-white | p-2">
          <i class="icon icon-add text-2xl"></i>
        </NuxtLink>
      </ClientOnly>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { Todo } from '~/models/Todo'
import { useScrollStore } from '~/store/scroll.store'
import { generateUniqueId } from '~/utils/etc'

const router = useRouter()
const scrollStore = useScrollStore()

const todos = ref<Todo[]>(Array(100).fill(Todo.of()))

onBeforeRouteLeave((to, from, next) => {
  if (from.name === 'index' && to.name === 'id') {
    const scrollTop = document.getElementById('scroll-area')?.scrollTop || 0
    scrollStore.saveScrollTop(scrollTop)
  }

  next()
})

onMounted(() => {
  if (`${router.options.history.state.forward}`.match(/\/\d+/)) {
    const scrollArea = document.getElementById('scroll-area')
    scrollArea?.scrollTo({ top: scrollStore.savedScrollTop })
    scrollStore.saveScrollTop(0)
  }
})
</script>
