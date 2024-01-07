<template>
  <div
    class="absolute right-0 -top-4 -translate-y-full | w-fit | ml-auto mr-3 | flex flex-col gap-1">
    <button
      v-if="isShowScrollTop"
      class="flex items-center justify-center | aspect-square overflow-hidden | bg-black rounded-full | text-white | p-2"
      @click="$emit('scrollTop')">
      <i class="icon icon-arrow-top | text-xl"></i>
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
