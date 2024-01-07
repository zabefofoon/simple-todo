<template>
  <div class="flex | h-dvh overflow-hidden">
    <SNB />
    <div class="flex flex-col | w-full h-full">
      <slot name="header"><Header /></slot>
      <main
        id="scroll-area"
        ref="scrollArea"
        class="relative | h-full"
        :class="lockScrollClass"
        @scroll="checkShowScrollTop">
        <slot />
      </main>
      <nav class="relative | border">
        <FloatingButtons
          :is-show-scroll-top="isShowScrollTop"
          @scroll-top="scrollTop">
          <slot name="actions" />
        </FloatingButtons>
        <BottomAppBar />
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScrollStore } from '~/store/scroll.store'

const scrollStore = useScrollStore()

const scrollArea = ref<HTMLDivElement>()
const scrollTop = () =>
  toValue(scrollArea)?.scrollTo({ top: 0, behavior: 'smooth' })

const isShowScrollTop = ref(false)
const checkShowScrollTop = () => {
  const scrollTop = toValue(scrollArea)?.scrollTop || 0
  isShowScrollTop.value = scrollTop > 10
}

const lockScrollClass = computed(() =>
  scrollStore.scrollLocked
    ? 'overflow-hidden lg:overflow-auto'
    : 'overflow-auto'
)

onMounted(() => {
  checkShowScrollTop()
})
</script>
~/store/scroll.store