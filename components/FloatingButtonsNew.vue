<template>
  <NuxtLink
    :to="to"
    class="flex | bg-slate-800 rounded-full | text-white | p-2"
    area-label="New todo">
    <i class="icon icon-add text-2xl text-white"></i>
  </NuxtLink>
</template>

<script setup lang="ts">
const route = useRoute()

const to = computed(() =>
  route.name === 'calender-id'
    ? `/todo/new?date=${route.params.id}`
    : '/todo/new'
)
</script>

<style></style>
