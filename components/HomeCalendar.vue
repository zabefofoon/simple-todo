<template>
  <div
    class="h-fit | flex flex-col gap-2 | flex-shrink-0 | lg:min-w-[300px] lg:w-[25vw] | p-2 lg:p-3 | border rounded-lg"
    :class="storageStore.getThemeClass('bg-white', 'border-slate-700')">
    <Calendar v-if="!loadingStore.todoLoading" :slice="2" />
  </div>
</template>

<script setup lang="ts">
const storageStore = useStorageStore()
const loadingStore = useLoadingStore()
</script>
