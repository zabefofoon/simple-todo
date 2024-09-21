<template>
  <NuxtLink
    class="w-full max-w-[50%] | relative"
    :to="`${route.path}?search=true`"
    area-label="Search">
    <input
      readonly
      class="w-full | px-3 py-1 | rounded-full | text-sm focus:border-0 focus:outline-0"
      :class="
        storageStore.getThemeClass('bg-slate-200', 'bg-slate-600 | text-white')
      "
      :placeholder="i18n.t('Search')" />
    <i
      class="icon icon-search | text-xl | absolute right-1 top-1/2 -translate-y-1/2"
      :class="storageStore.getThemeClass('', 'text-white')"></i>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
const i18n = useI18n()

const route = useRoute()
</script>
