<template>
  <UIModal
    modal-name="SearchModal"
    class="ml-auto transition-all"
    :class="
      storageStore.isSNBExpanded
        ? 'lg:w-[calc(100vw-240px)]'
        : 'lg:w-[calc(100vw-52px)]'
    "
    content-class="border-t border-theme bg-theme-3 | w-full h-full"
    overlay-class="ml-auto"
    hide-close
    :content-transition="settingStore.screen === 'lg' ? 'none' : 'slide-right'"
    @close="emit('close')">
    <div
      class="sticky top-0 z-20 | flex items-center gap-2 | px-2 py-2 | bg-theme-3 | border-b border-theme">
      <button name="Back" class="flex" @click="emit('close')">
        <i class="icon icon-arrow-left | text-theme"></i>
      </button>
      <Skeletor v-if="loadingStore.todoLoading" class="w-full h-[32px]" />
      <div v-else class="input-wrap | w-full lg:max-w-[50%] | relative">
        <input
          ref="input"
          class="w-full | px-3 py-1 | rounded-full | text-theme | bg-slate-200 dark:bg-slate-600"
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
          <i class="icon icon-close | text-xl text-theme"></i>
        </button>
        <button
          name="Search"
          class="flex | absolute right-1.5 top-1/2 -translate-y-1/2"
          @click="search">
          <i class="icon icon-search | text-xl text-theme"></i>
        </button>
      </div>
      <div
        v-if="isShowAddArea"
        class="w-full | absolute left-0 bottom-0 translate-y-full | bg-theme-3 | border-t border-b border-theme">
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
    <div class="h-full | flex flex-col | overflow-auto">
      <Spinner v-if="loadingStore.todoLoading" class="h-full" />
      <template v-else>
        <div v-if="todos.length" class="flex flex-col gap-2 | p-4 | h-full">
          <TodoRow
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            :route-query="route.query"
            :route-path="route.path" />
        </div>
        <h3 v-else class="w-full h-full | flex items-center justify-center">
          <span v-if="route.query.keyword" class="text-theme">
            {{ i18n.t('NoMatched', [route.query.keyword]) }}
          </span>
          <span v-else class="text-theme">
            {{ i18n.t('EnterKeyword') }}
          </span>
        </h3>
      </template>
    </div>
  </UIModal>
</template>

<script setup lang="ts">
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
      todo.description?.match(new RegExp(String(route.query.keyword), 'gi'))
    ) ?? []
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
</script>
