<template>
  <UIModal
    content-class="rounded-lg"
    display-directive="show"
    @close="emit('close')">
    <UICarousel use-dots gap="6px" :start-index="startIndex">
      <UICarouselSlide
        v-for="image in todo?.images"
        :key="image"
        class="w-full aspect-square lg:aspect-video">
        <img
          class="w-full h-full | object-contain object-center"
          :src="image" />
      </UICarouselSlide>
    </UICarousel>
  </UIModal>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo'

defineProps<{
  todo: Todo
  startIndex: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

onBeforeUnmount(() => {
  console.log('fdsa')
})
</script>
