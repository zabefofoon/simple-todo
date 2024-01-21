<template>
  <div class="flex | w-screen h-dvh overflow-hidden">
    <SNB />
    <div class="right-area | flex flex-col | h-full w-full overflow-hidden">
      <slot name="header"><Header /></slot>
      <main
        id="scroll-area"
        ref="scrollArea"
        class="flex flex-col | relative | h-full"
        :class="lockScrollClass"
        @scroll="checkShowScrollTop">
        <slot />
      </main>
      <nav class="relative | border-t">
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
