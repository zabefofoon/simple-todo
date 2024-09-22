<template>
  <ul
    class="safe-area-bottom | flex lg:hidden justify-around | border-t"
    :class="
      storageStore.getThemeClass('bg-white', 'bg-slate-950 border-slate-700')
    ">
    <NuxtLink
      v-for="menu in menus"
      :key="menu.href"
      :to="menu.href"
      class="w-full"
      :class="storageStore.getThemeClass('bg-white', 'bg-slate-900')"
      :area-label="menu.name"
      replace>
      <li>
        <button
          :name="menu.name"
          class="w-full | mx-auto py-2.5"
          :class="
            menu.href === route.path
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
    </NuxtLink>
  </ul>
</template>

<script setup lang="ts">
import { Menu } from '~/models/Menu'
import { useStorageStore } from '~/store/storage.store'

const i18n = useI18n()

const route = useRoute()
const storageStore = useStorageStore()

const menus = ref([
  Menu.of({ name: i18n.t('Home'), href: '/', icon: 'icon-home' }),
  Menu.of({ name: i18n.t('Todo'), href: '/todo', icon: 'icon-file' }),
  Menu.of({
    name: i18n.t('Calender'),
    href: '/calender',
    icon: 'icon-calender',
  }),
  Menu.of({
    name: i18n.t('Setting'),
    href: '/setting',
    icon: 'icon-setting',
  }),
])
</script>
