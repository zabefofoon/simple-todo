<template>
  <UIModal
    modal-name="TodoImageModal"
    class="!z-50"
    content-class="p-2 lg:p-4 | rounded-lg | w-[92vw] max-w-[800px] | bg-theme-1"
    @close="emit('close')">
    <UICarousel use-dots gap="6px" :start-index="startIndex">
      <UICarouselSlide
        v-for="(image, index) in todo?.images"
        :key="index"
        class="w-full aspect-square lg:aspect-video">
        <img
          class="w-full h-full | object-contain object-center"
          :src="imageSrc(image)" />
      </UICarouselSlide>
    </UICarousel>
  </UIModal>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo'

defineProps<{
  todo?: Todo
  startIndex: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const imageSrc = (image: string | Blob) => {
  return typeof image === 'string' ? image : URL.createObjectURL(image)
}
</script>
