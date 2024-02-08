<template>
  <div v-if="keywords?.length" class="py-2 px-4">
    <NuxtLink
      v-for="searchedKeyword in keywords?.slice(0, 10)"
      :key="searchedKeyword"
      :to="`/search?keyword=${searchedKeyword}`"
      replace
      class="w-full | flex items-center gap-2 | py-0.5">
      <span
        v-html="getHighlightedKeyword(searchedKeyword)"
        class="truncate"></span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '~/store/todo.store'

const props = defineProps<{
  keyword: string
}>()

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
      ?.filter((todo) => todo.description?.includes(String(keyword)))
      .map((todo) => todo.description)
      .filter((description): description is string => !!description)

    setKeywords([...new Set(result || [])])
  },
  { immediate: true }
)
</script>

<style></style>
