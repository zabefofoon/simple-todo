<template>
  <UIModal
    modal-name="TodoImageModal"
    :content-class="`p-2 lg:p-4 | rounded-lg | w-[92vw] max-w-[800px] ${storageStore.getThemeClass(
      'bg-white',
      'bg-slate-800'
    )}`"
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
import { useStorageStore } from '~/store/storage.store'

defineProps<{
  todo?: Todo
  startIndex: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const storageStore = useStorageStore()
</script>
