<template>
  <div v-if="keywords?.length" class="py-2 px-4">
    <NuxtLinkLocale
      v-for="searchedKeyword in keywords?.slice(0, 10)"
      :key="searchedKeyword"
      :to="`${route.path}?search=true&keyword=${searchedKeyword}`"
      replace
      class="w-full | flex items-center gap-2 | py-0.5"
      :area-label="`Search ${searchedKeyword}`">
      <span
        v-html="getHighlightedKeyword(searchedKeyword)"
        class="truncate text-theme"></span>
    </NuxtLinkLocale>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  keyword: string
}>()

const route = useRoute()

const todoStore = useTodoStore()

const keywords = ref<string[]>()
const setKeywords = (value?: string[]) => (keywords.value = value)

const getHighlightedKeyword = (keyword: string) => {
  return keyword.replace(
    props.keyword,
    (str) => `<span class="text-orange-500">${str}</span>`
  )
}

watch(
  () => props.keyword,
  (keyword) => {
    const result = todoStore.todos
      ?.filter((todo) => todo.description?.match(new RegExp(keyword, 'gi')))
      .map((todo) => todo.description)
      .filter((description): description is string => !!description)
      .map((description) => escapeHTML(description))

    setKeywords([...new Set(result || [])])
  },
  { immediate: true }
)
</script>
