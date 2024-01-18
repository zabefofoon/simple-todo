<template>
  <div
    class="absolute right-0 -top-4 -translate-y-full z-10 | w-fit | ml-auto mr-3 | flex flex-col gap-1">
    <button
      v-if="isShowScrollTop && $route.name !== 'todo-id'"
      class="flex items-center justify-center | aspect-square overflow-hidden | bg-slate-800 rounded-full | text-white | p-2"
      @click="$emit('scrollTop')">
      <i class="icon icon-arrow-top | text-xl text-white"></i>
    </button>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
    isShowScrollTop: boolean
}>()
const emit = defineEmits<{
  (e: 'scrollTop'): void
}>()

</script>

<style></style>
