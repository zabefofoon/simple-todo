<template>
  <VueFinalModal
    class="flex justify-center items-center | !z-40"
    :class="{ 'opacity-0': isPageSiped }"
    :content-class="computedContentClass"
    :overlay-class="overlayClass"
    :content-transition="
      settingStore.isTouchCanceled ? 'none' : contentTransition ?? 'slide-up'
    "
    :overlay-transiton="settingStore.isTouchCanceled ? 'none' : 'fade'"
    @update:model-value="emit('close')">
    <template #default>
      <div class="h-full">
        <button
          v-if="!hideClose"
          class="absolute right-[16px] top-[16px] lg:right-1 lg:top-1 z-10 | flex | rounded-full p-0.5"
          :class="
            storageStore.getThemeClass('bg-white', 'bg-slate-800 text-white')
          "
          @click="emit('close')">
          <i class="icon icon-close"></i>
        </button>
        <div v-if="title" class="flex items-start | mb-[30px]">
          <h2 class="text-[18px] lg:text-[24px] font-[700]">
            {{ title }}
          </h2>
        </div>
        <div class="relative | h-full | flex flex-col">
          <slot />
        </div>
      </div>
    </template>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps<{
  title?: string
  contentClass?: string
  overlayClass?: string
  contentTransition?: string
  hideClose?: boolean
  modalName: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const storageStore = useStorageStore()
const settingStore = useSettingStore()

const isPageSiped = ref(settingStore.isSiped)
const setPageSiped = (value: boolean) => (isPageSiped.value = value)

const computedContentClass = computed<string>(() => {
  return `!z-40 | flex flex-col justify-center | relative | ${props.contentClass}`
})

onMounted(() => {
  settingStore.pushCurrentModal(props.modalName)
})

onBeforeUnmount(() => {
  settingStore.popCurrentModal()
})

watch(
  () => settingStore.isSiped,
  (value) => {
    if (props.modalName === settingStore.currentModals.at(-1))
      setPageSiped(value)
  }
)
</script>
