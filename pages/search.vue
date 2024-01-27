<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <div
        class="sticky top-0 z-20 | flex items-center gap-2 | bg-white | px-2 py-2 | border-b">
        <button class="flex" @click="$router.back()">
          <i class="icon icon-arrow-left"></i>
        </button>
        <div class="input-wrap | w-full lg:max-w-[50%] | relative">
          <input
            ref="input"
            class="w-full | px-3 py-1 | bg-slate-200 | rounded-full | text-sm"
            :placeholder="$t('Search')"
            :value="keyword"
            @input="setKeyword"
            @focus="showAddArea(true)"
            @keydown.enter="search" />
          <button
            v-show="keyword"
            class="flex | absolute right-7 top-1/2 -translate-y-1/2"
            @click="close()">
            <i class="icon icon-close | text-xl"></i>
          </button>
          <button
            class="flex | absolute right-1.5 top-1/2 -translate-y-1/2"
            @click="search">
            <i class="icon icon-search | text-xl"></i>
          </button>
        </div>
        <div
          v-if="isShowAddArea"
          class="w-full | absolute left-0 bottom-0 translate-y-full | border | bg-white">
          <SearchAutocomplete v-if="keyword" :keyword="keyword" />
          <SearchRecentKeywords v-else />
        </div>
      </div>
      <template v-if="isShowAddArea">
        <div
          class="fixed lg:hidden top-0 left-0 | w-full h-full"
          style="background: rgba(0, 0, 0, 0.3); z-index: 1"
          @click.stop="showAddArea(false)"></div>
        <div
          class="hidden lg:block | fixed top-0 left-0 | w-full h-full"
          style="background: rgba(0, 0, 0, 0); z-index: 1"
          @click.stop="showAddArea(false)"></div>
      </template>
    </template>
    <div class="h-full | flex flex-col">
      <div
        v-if="settingStore.setting?.display === 'thumbnail'"
        class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 | p-4">
        <TodoThumbnail
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          hide-delete
          @delete="todoStore.deleteTodo"
          @done="todoStore.doneTodo" />
      </div>
      <div
        v-else-if="todos?.length"
        class="flex flex-col gap-2 | p-4 | h-full">
        <TodoRow v-for="todo in todos" :key="todo.id" :todo="todo" />
      </div>
      <h3
        v-if="!todos?.length"
        class="w-full h-full | flex items-center justify-center">
        <span v-if="route.query.keyword">
          {{ $t('NoMatched', [route.query.keyword]) }}
        </span>
        <span v-else>{{ $t('EnterKeyword') }}</span>
      </h3>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo'
import { useSettingStore } from '~/store/setting.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

const router = useRouter()
const route = useRoute()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const settingStore = useSettingStore()

const input = ref<HTMLInputElement>()

const keyword = ref()
const setKeyword = (event?: Event | string) => {
  keyword.value =
    typeof event === 'string' ? event : (<HTMLInputElement>event?.target)?.value
}

const isShowAddArea = ref()
const showAddArea = (value?: boolean) => (isShowAddArea.value = value)

const close = () => {
  setKeyword()
  search()
  toValue(input)?.focus()
}

const search = () => {
  const data = toValue(keyword)
  router.replace({ query: { keyword: data } })
  storageStore.addRecentKeywords(data)
  showAddArea(false)
  toValue(input)?.blur()
}

onMounted(() => {
  if (!route.query.keyword) toValue(input)?.focus()
})

const todos = ref<Todo[]>()
const setTodos = (data?: Todo[]) => (todos.value = data)

watch(
  () => route.query.keyword,
  (queryKeyword) =>
    setTimeout(() => {
      if (!queryKeyword) return
      showAddArea(false)
      const todos = todoStore.todos?.filter((todo) =>
        todo.description?.includes(String(queryKeyword))
      )
      setTodos(todos)

      setKeyword(String(queryKeyword || ''))
    }),
  { immediate: true }
)
</script>
