<template>
  <VueFinalModal
    class="flex justify-center items-center !z-40"
    :class="{ 'opacity-0': isPageSiped }"
    :content-class="computedContentClass"
    overlay-class="!z-40"
    :content-transition="isPageSiped ? 'none' : contentTransition ?? 'slide-up'"
    :overlay-transiton="isPageSiped ? 'none' : 'fade'"
    :display-directive="displayDirective"
    @update:model-value="emit('close')">
    <template #default>
      <div
        class="h-full"
        @touchstart.prevent
        @touchmove.prevent
        @touchend.prevent>
        <button
          v-if="!hideClose"
          class="absolute right-[16px] top-[16px] lg:right-1 lg:top-1 z-10 | flex | bg-slate-800 rounded-full p-0.5"
          :class="storageStore.getThemeClass('', 'text-white')"
          @click="emit('close')"
          @touchstart.stop
          @touchmove.stop
          @touchend.stop>
          <i class="icon icon-close"></i>
        </button>
        <div v-if="title" class="flex items-start | mb-[30px]">
          <h2 class="text-[18px] lg:text-[24px] font-[700]">
            {{ title }}
          </h2>
        </div>
        <div
          class="relative | h-fit"
          @touchstart.stop
          @touchmove.stop
          @touchend.stop>
          <slot />
        </div>
      </div>
    </template>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { useStorageStore } from '~/store/storage.store'

const props = defineProps<{
  title?: string
  contentClass?: string
  contentTransition?: string
  hideClose?: boolean
  displayDirective?: 'if' | 'show' | 'visible'
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { isIos } = useDevice()

const storageStore = useStorageStore()

const touchstartXs = ref<number[]>([0, 0, 0])
const isPageSiped = ref(false)

const computedContentClass = computed<string>(() => {
  return `!z-50 | flex flex-col justify-center | relative | p-2 lg:p-4 | ${storageStore.getThemeClass(
    'bg-white',
    'bg-slate-800'
  )} lg:rounded-lg | w-[92vw] max-w-[800px] | ${props.contentClass}`
})

const touchmoveHandler = ({ changedTouches }: TouchEvent): void => {
  if (changedTouches[0].clientX < 7) {
    touchstartXs.value.push(changedTouches[0].clientX)
    if (touchstartXs.value.length > 3) {
      touchstartXs.value = touchstartXs.value.slice(1)
    }
  }
}

const touchendHandler = (): void => {
  if (touchstartXs.value[2] - touchstartXs.value[0] > 1) {
    isPageSiped.value = true
  }
}

onMounted(() => {
  if (isIos) {
    window.addEventListener('touchmove', touchmoveHandler, { passive: true })
    window.addEventListener('touchend', touchendHandler, { passive: true })
  }
})

onBeforeUnmount(() => {
  if (isIos) {
    window.removeEventListener('touchmove', touchmoveHandler)
    window.removeEventListener('touchend', touchendHandler)
  }
})
</script>
