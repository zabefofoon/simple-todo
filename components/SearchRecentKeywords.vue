<template>
  <div class="py-2 px-4">
    <h3 v-if="!keywords?.length" class="text-center text-sm">
      {{ i18n.t('NoKeywords') }}
    </h3>
    <NuxtLink
      v-for="keyword in keywords?.slice(0, 10)"
      :key="keyword"
      :to="`/search?keyword=${keyword}`"
      replace
      class="w-full | flex items-center gap-2 | py-0.5"
      :area-label="`Search ${keyword}`">
      <i
        class="icon icon-close"
        :class="storageStore.getThemeClass('', 'text-white')"
        @click.prevent="removeKeyword(keyword)"></i>
      <span
        class="truncate"
        :class="storageStore.getThemeClass('', 'text-white')"
        >{{ keyword }}</span
      >
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'

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
