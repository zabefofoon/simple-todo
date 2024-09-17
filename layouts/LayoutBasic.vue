<template>
  <div
    class="flex | w-screen h-dvh overflow-hidden"
    :class="storageStore.getThemeClass('bg-white', 'bg-slate-900')">
    <BulkButtons v-if="route.query.bulk" />
    <SNB />
    <div class="right-area | flex flex-col | h-full w-full overflow-hidden">
      <slot name="header"><Header /></slot>
      <main
        id="scroll-area"
        ref="scrollArea"
        class="flex flex-col | h-full"
        :class="lockScrollClass"
        @scroll="checkShowScrollTop">
        <slot />
      </main>
      <nav class="relative">
        <FloatingButtons
          v-if="!route.query.bulk"
          :is-show-scroll-top="isShowScrollTop"
          @scroll-top="scrollTop">
          <slot name="actions" />
        </FloatingButtons>
        <BottomAppBar
          v-if="
            ![
              'todo-id',
              'todo-edit-id',
              'todo-tag-id',
              'calender-id',
              'search',
              'notification',
              'form-id',
            ].includes((route.name ?? '')?.toString())
          " />
      </nav>
    </div>
  </div>
  <ClientOnly>
    <ModalsContainer />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'

import { useScrollStore } from '~/store/scroll.store'
import { useStorageStore } from '~/store/storage.store'

const route = useRoute()

const scrollStore = useScrollStore()
const storageStore = useStorageStore()

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
