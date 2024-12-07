<template>
  <ul
    class="safe-area-bottom | flex lg:hidden justify-around | border-t"
    :class="
      storageStore.getThemeClass('bg-white', 'bg-slate-950 border-slate-700')
    ">
    <NuxtLinkLocale
      v-for="menu in menuStore.appBarMenus"
      :key="menu.href + storageStore.language"
      :to="menu.href"
      class="w-full"
      :class="storageStore.getThemeClass('bg-white', 'bg-slate-900')"
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
                    'bg-gray-950'
                  )
                : storageStore.getThemeClass('', '')
            ">
            <i
              class="icon text-xl"
              :class="[
                menu.icon,
                storageStore.getThemeClass('', 'text-white'),
              ]"></i>
            <span
              class="text-[10px]"
              :class="storageStore.getThemeClass('', 'text-white')"
              v-t="menu.name">
            </span>
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
