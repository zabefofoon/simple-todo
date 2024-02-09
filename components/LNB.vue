<template>
  <nav
    class="absolute bottom-0 | lg:hidden | w-full | transition-all"
    :class="[
      isExpanded ? 'translate-y-full' : '-translate-y-0',
      storageStore.getThemeClass('bg-white', 'bg-slate-900'),
    ]">
    <ul>
      <NuxtLink
        v-for="menu in menuStore.menus"
        :key="menu.code"
        :to="menu.href">
        <li
          class="flex items-center justify-center gap-2 | py-2"
          :class="
            menu.href === route.path
              ? storageStore.getThemeClass('bg-slate-100', 'bg-gray-950')
              : storageStore.getThemeClass('', '')
          ">
          <i
            class="icon"
            :class="[
              menu.icon,
              storageStore.getThemeClass('', 'text-white'),
            ]"></i>
          <span :class="storageStore.getThemeClass('', 'text-white')">
            {{ $t(menu.name) }}
          </span>
        </li>
      </NuxtLink>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useMenuStore } from '~/store/menu.store'
import { useScrollStore } from '~/store/scroll.store'
import { useStorageStore } from '~/store/storage.store'

defineProps<{
  isExpanded: boolean
}>()

const route = useRoute()

const menuStore = useMenuStore()
const scrollStore = useScrollStore()
const storageStore = useStorageStore()

onBeforeUnmount(() => {
  scrollStore.lockScroll(false)
})
</script>

<style></style>
