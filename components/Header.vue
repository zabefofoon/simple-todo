<template>
  <Transition name="fade">
    <div
      v-if="isExpanded"
      class="lg:hidden | fixed top-0 left-0 z-20 | w-full h-full"
      style="background: rgba(0, 0, 0, 0.3)"
      @click="expand(false)"></div>
  </Transition>
  <header class="relative z-30 | lg:hidden">
    <div class="flex items-center | relative z-30 bg-white | px-4 py-2 | border-b">
      <NuxtLink class="block | w-full | font-bold" to="/">
        MEMOO
      </NuxtLink>
      <button class="flex" @click="expand()">
        <i v-if="!isExpanded" class="icon icon-bars text-xl"></i>
        <i v-else class="icon icon-close text-xl"></i>
      </button>
    </div>
    <LNB :is-expanded="isExpanded" />
  </header>
</template>

<script setup lang="ts">
import { useScrollStore } from '~/store/scroll.store'

const scrollStore = useScrollStore()

const isExpanded = ref(false)
const expand = (value?: boolean) => {
  isExpanded.value = value === undefined ? !toValue(isExpanded) : value

  scrollStore.lockScroll(toValue(isExpanded))
}
</script>