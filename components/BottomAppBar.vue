<template>
  <ul
    class="safe-area-bottom | flex lg:hidden justify-around | border-t"
    :class="
      storageStore.getThemeClass('bg-white', 'bg-slate-950 border-slate-700')
    ">
    <NuxtLinkLocale
      v-for="menu in menuStore.appBarMenus"
      :key="menu.href"
      :to="menu.href"
      class="w-full"
      :class="storageStore.getThemeClass('bg-white', 'bg-slate-900')"
      :area-label="menu.name">
      <li>
        <button
          :name="menu.name"
          class="w-full | mx-auto py-2.5"
          :class="
            menuStore.isCurrentHref(menu.href)
              ? storageStore.getThemeClass('bg-slate-100', 'bg-gray-950')
              : storageStore.getThemeClass('', '')
          ">
          <div class="flex flex-col items-center gap-.5 | w-full">
            <i
              class="icon text-xl"
              :class="[
                menu.icon,
                storageStore.getThemeClass('', 'text-white'),
              ]"></i>
            <span
              class="text-xs"
              :class="storageStore.getThemeClass('', 'text-white')">
              {{ menu.name }}
            </span>
          </div>
        </button>
      </li>
    </NuxtLinkLocale>
  </ul>
</template>

<script setup lang="ts">
import { useMenuStore } from '~/store/menu.store'
import { useStorageStore } from '~/store/storage.store'

const i18n = useI18n()

const menuStore = useMenuStore()
const storageStore = useStorageStore()
</script>
