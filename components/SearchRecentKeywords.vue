<template>
  <div class="py-2 px-4">
    <h3 v-if="!keywords?.length" class="text-center text-sm dark:text-white">
      {{ i18n.t('NoKeywords') }}
    </h3>
    <NuxtLinkLocale
      v-for="keyword in keywords?.slice(0, 10)"
      :key="keyword"
      :to="`${route.path}?search=true&keyword=${keyword}`"
      replace
      class="w-full | flex items-center gap-2 | py-0.5"
      :area-label="`Search ${keyword}`">
      <i
        class="icon icon-close text-theme"
        @click.prevent="removeKeyword(keyword)"></i>
      <span class="truncate text-theme">{{ keyword }}</span>
    </NuxtLinkLocale>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const storageStore = useStorageStore()
const i18n = useI18n()

const keywords = ref<string[]>()
const setKeywords = (value?: string[]) => (keywords.value = value)
const removeKeyword = (keyword: string) => {
  const removed = toValue(keywords)?.filter(
    (savedKeyword) => savedKeyword !== keyword
  )
  setKeywords(removed)
  storageStore.removeKeywords(keyword)
}

onMounted(() => {
  setKeywords(storageStore.getRecentKeywords())
})
</script>
