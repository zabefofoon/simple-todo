<template>
  <UIModal
    modal-name="SearchModal"
    class="ml-auto transition-all"
    :class="
      storageStore.isSNBExpanded
        ? 'lg:w-[calc(100vw-240px)]'
        : 'lg:w-[calc(100vw-52px)]'
    "
    :content-class="`w-full h-full | ${storageStore.getThemeClass(
      'bg-white',
      'bg-slate-900'
    )}`"
    overlay-class="ml-auto"
    hide-close
    :content-transition="settingStore.screen === 'lg' ? 'none' : 'slide-right'"
    @close="emit('close')">
    <div
      class="sticky top-0 z-20 | flex items-center gap-2 | px-2 py-2 | border-b"
      :class="
        storageStore.getThemeClass('bg-white', 'bg-slate-900 border-slate-700')
      ">
      <button name="Back" class="flex" @click="emit('close')">
        <i
          class="icon icon-arrow-left"
          :class="storageStore.getThemeClass('', 'text-white')"></i>
      </button>
      <Skeletor v-if="loadingStore.todoLoading" class="w-full h-[32px]" />
      <div v-else class="input-wrap | w-full lg:max-w-[50%] | relative">
        <input
          ref="input"
          class="w-full | px-3 py-1 | rounded-full"
          :class="
            storageStore.getThemeClass(
              'bg-slate-200',
              'bg-slate-600 | text-white'
            )
          "
          :placeholder="i18n.t('Search')"
          :value="keyword"
          @input="setKeyword"
          @focus="showAddArea(true)"
          @keydown.enter="search" />
        <button
          v-show="keyword"
          name="Close"
          class="flex | absolute right-7 top-1/2 -translate-y-1/2"
          @click="close()">
          <i
            class="icon icon-close | text-xl"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
        </button>
        <button
          name="Search"
          class="flex | absolute right-1.5 top-1/2 -translate-y-1/2"
          @click="search">
          <i
            class="icon icon-search | text-xl"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
        </button>
      </div>
      <div
        v-if="isShowAddArea"
        class="w-full | absolute left-0 bottom-0 translate-y-full | border-t border-b"
        :class="
          storageStore.getThemeClass(
            'bg-white',
            'bg-slate-900 border-slate-700'
          )
        ">
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
    <div class="h-full | flex flex-col">
      <Spinner v-if="loadingStore.todoLoading" class="h-full" />
      <template v-else>
        <template v-if="storageStore.display === 'thumbnail'">
          <div
            v-if="todos?.length"
            class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 | p-4">
            <TodoThumbnail
              v-for="todo in todos"
              :key="todo.id"
              :todo="todo"
              hide-delete
              @delete="deleteTodo(todo)"
              @done="(id, done) => doneTodo(todo, done)" />
          </div>
        </template>
        <div
          v-else-if="todos?.length"
          class="flex flex-col gap-2 | p-4 | h-full">
          <TodoRow
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @delete="deleteTodo(todo)"
            @done="(id, done) => doneTodo(todo, done)" />
        </div>
        <h3
          v-if="!todos?.length"
          class="w-full h-full | flex items-center justify-center">
          <span
            v-if="route.query.keyword"
            :class="storageStore.getThemeClass('', 'text-white')">
            {{ i18n.t('NoMatched', [route.query.keyword]) }}
          </span>
          <span v-else :class="storageStore.getThemeClass('', 'text-white')">{{
            i18n.t('EnterKeyword')
          }}</span>
        </h3>
      </template>
    </div>
    <nav class="fixed right-4 bottom-4 z-10">
      <FloatingButtonsNew />
    </nav>
  </UIModal>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo'
import { useGoogleStore } from '~/store/google.store'
import { useLoadingStore } from '~/store/loading.store'
import { useSettingStore } from '~/store/setting.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const i18n = useI18n()

const router = useRouter()
const route = useRoute()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const loadingStore = useLoadingStore()
const settingStore = useSettingStore()
const googleStore = useGoogleStore()

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
  router.replace({ path: route.path, query: { ...route.query, keyword: data } })
  storageStore.addRecentKeywords(data)
  showAddArea(false)
  toValue(input)?.blur()
}

onMounted(() => {
  setTimeout(() => {
    if (!route.query.keyword) toValue(input)?.focus()
  })
})

const todos = computed(
  () =>
    todoStore.todos?.filter((todo) =>
      todo.description?.includes(String(route.query.keyword))
    ) || []
)

watch(
  () => route.query.keyword,
  (queryKeyword) =>
    setTimeout(() => {
      if (!queryKeyword) return
      showAddArea(false)

      setKeyword(String(queryKeyword || ''))
    }),
  { immediate: true }
)

const deleteTodo = (todo: Todo) => {
  if (confirm(i18n.t('ConfirmDelete')))
    todo.linked
      ? googleStore.deleteTodo2([todo])
      : todoStore.deleteTodo(todo.id ?? '')
}

const doneTodo = (todo: Todo, done?: boolean) => {
  todo.done = !done
  todo.linked
    ? googleStore.doneTodo2([todo], !done)
    : todoStore.doneTodo(todo.id ?? '', !done)
}
</script>
