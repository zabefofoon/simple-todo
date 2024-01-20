<template>
  <ClientOnly>
    <nav
      class="absolute bottom-0 | lg:hidden | w-full | bg-white | transition-all"
      :class="isExpanded ? 'translate-y-full' : '-translate-y-0'">
      <ul class="py-2">
        <NuxtLink
          v-for="menu in menuStore.menus"
          :key="menu.code"
          :to="menu.href">
          <li class="flex items-center justify-center gap-2 | py-1.5">
            <i class="icon" :class="menu.icon"></i>
            <span>{{ $t(menu.name) }}</span>
          </li>
        </NuxtLink>
      </ul>
    </nav>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useMenuStore } from '~/store/menu.store'
import { useScrollStore } from '~/store/scroll.store'

defineProps<{
  isExpanded: boolean
}>()

const menuStore = useMenuStore()
const scrollStore = useScrollStore()

onBeforeUnmount(() => {
  scrollStore.lockScroll(false)
})
</script>

<style></style>
