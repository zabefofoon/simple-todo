<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <header class="flex items-center | py-2 px-4 | border">
        <input
          class="px-3 py-1 | bg-slate-200 | rounded-full"
          placeholder="Search" />
        <button class="flex lg:hidden | ml-auto">
          <i class="icon icon-bars text-xl"></i>
        </button>
      </header>
    </template>
    <div
      v-if="!todos.length"
      class="w-full h-full | flex flex-col justify-center items-center">
      Create Todo
    </div>
    <div v-else class="flex flex-col">
      <div
        class="sticky top-0 z-10 | flex items-center gap-2 | bg-white | px-4 py-2 | border">
        <select class="border | p-1 | text-sm">
          <option>All</option>
          <option>Day</option>
          <option>Weekend</option>
          <option>Month</option>
          <option>Year</option>
        </select>
        <button class="flex | border p-1">
          <i class="icon icon-grid text-lg"></i>
        </button>
        <button class="flex | border p-1">
          <i class="icon icon-row text-lg"></i>
        </button>
      </div>

      <div
        class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 | p-4">
        <NuxtLink v-for="(todo, index) in todos" :key="index" :to="`/${index}`">
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
    <div class="fixed right-8 bottom-8">
      <button class="flex | bg-black rounded-full text-white p-2">
        <i class="icon icon-add text-2xl"></i>
      </button>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { Todo } from '~/models/Todo'
import { useGlobalStore } from '~/store/global.store'

const router = useRouter()
const globalStore = useGlobalStore()

const todos = ref<Todo[]>(Array(100).fill(Todo.of()))

onBeforeRouteLeave((to, from, next) => {
  if (from.name === 'index' && to.name === 'id') {
    const scrollTop = document.getElementById('scroll-area')?.scrollTop || 0
    globalStore.saveScrollTop(scrollTop)
  }

  next()
})

onMounted(() => {
  if (`${router.options.history.state.forward}`.match(/\/\d+/)) {
    const scrollArea = document.getElementById('scroll-area')
    scrollArea?.scrollTo({ top: globalStore.savedScrollTop })
    globalStore.saveScrollTop(0)
  }
})
</script>
