<template>
  <ul
    class="safe-area-bottom | bg-theme-3 | border-theme | flex lg:hidden justify-around | border-t">
    <NuxtLinkLocale
      v-for="menu in menuStore.appBarMenus"
      :key="menu.href + storageStore.language"
      :to="menu.href"
      class="w-full"
      :area-label="i18n.t(menu.name ?? '')"
      replace>
      <li>
        <button
          :name="i18n.t(menu.name ?? '')"
          class="w-full | mx-auto pt-1 pb-2 px-2">
          <div
            class="relative | flex flex-col items-center gap-.5 | w-full | py-2 rounded-lg"
            :class="
              menuStore.isCurrentHref(menu.href)
                ? storageStore.getThemeClass(
                    'bg-slate-700 text-white',
                    'bg-gray-950 text-white'
                  )
                : storageStore.getThemeClass('', 'text-white')
            ">
            <i class="icon text-xl" :class="menu.icon"></i>
            <span class="text-[10px]" v-t="menu.name"> </span>
            <div
              v-if="menu.code === 'News'"
              class="w-1 h-1 | bg-red-500 | rounded-full | absolute top-1 -translate-x-2"></div>
          </div>
        </button>
      </li>
    </NuxtLinkLocale>
  </ul>
</template>

<script setup lang="ts">
const menuStore = useMenuStore()
const storageStore = useStorageStore()
const i18n = useI18n()
</script>
