<template>
  <NuxtLink
    :to="`${route.path}?search=true`"
    class="flex | bg-slate-800 rounded-full | p-2"
    area-label="Search">
    <i class="icon icon-search text-2xl text-white"></i>
  </NuxtLink>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
