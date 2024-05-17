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
        :to="menu.href"
        :area-label="menu.name"
        :target="menu.target">
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
      <hr :class="storageStore.getThemeClass('', 'border-slate-700')" />
      <footer
        class="px-3 py-2 | text-center | flex items-center justify-between gap-2">
        <div class="flex gap-1.5 items-center justify-center">
          <NuxtLink
            to="https://www.threads.net/@sangwwooo/post/C7E92AAv_pz"
            target="_blank"
            class="flex">
            <i
              class="icon icon-threads"
              :class="storageStore.getThemeClass('', 'text-white')"></i>
          </NuxtLink>
          <NuxtLink
            to="https://zabefofoon.tistory.com/24"
            target="_blank"
            class="flex">
            <i
              class="icon icon-tistory text-xs"
              :class="storageStore.getThemeClass('', 'text-white')"></i>
          </NuxtLink>
        </div>

        <span
          class="text-sm"
          :class="storageStore.getThemeClass('', 'text-white')">
          v{{ packageJson.version }}
        </span>
      </footer>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import packageJson from '~/package.json'
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
