<template>
  <NuxtLinkLocale
    class="w-full max-w-[50%] | relative"
    :to="to"
    area-label="Search">
    <input
      readonly
      class="w-full | px-3 py-1 | rounded-full | text-theme text-sm focus:border-0 focus:outline-0 | bg-slate-200 dark:bg-slate-600"
      :placeholder="i18n.t('Search')" />
    <i
      class="icon icon-search | text-xl text-theme | absolute right-1 top-1/2 -translate-y-1/2"></i>
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
const i18n = useI18n()

const route = useRoute()

const to = computed(() => {
  return `${route.path}?${routerUtil.queryToString(route.query)}&search=true`
})
</script>
