<template>
  <NuxtLinkLocale
    :to="to"
    class="flex | bg-slate-800 rounded-full | p-2"
    area-label="Search">
    <i class="icon icon-search text-2xl text-white"></i>
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
const route = useRoute()

const to = computed(() => {
  return `${route.path}?${routerUtil.queryToString(route.query)}&search=true`
})
</script>
