<template>
  <div
    class="flex flex-col gap-2 flex-1 | flex-shrink-0 | lg:min-w-[300px] lg:w-[25vw] | px-3 py-1 | border border-theme rounded-lg | bg-theme-3">
    <Calendar v-if="!loadingStore.todoLoading" :slice="2" />
  </div>
</template>

<script setup lang="ts">
const loadingStore = useLoadingStore()
</script>
