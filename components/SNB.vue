<template>
  <aside
    class="flex-shrink-0 | hidden lg:block | w-[240px] h-full | border-r"
    :class="
      storageStore.getThemeClass(
        'border-slate-200 | bg-white',
        'bg-slate-900 border-slate-700'
      )
    ">
    <nav class="flex flex-col | h-full">
      <NuxtLink to="/" area-label="Home">
        <div
          class="pt-8 | text-center font-bold | flex justify-center items-center gap-1">
          <img
            class="w-[20px] aspect-square"
            :class="
              storageStore.getThemeClass(
                '',
                'w-[32px] border-white border-4 | rounded-full'
              )
            "
            src="~/assets/images/logo.svg"
            alt="memoku" />
          <span :class="storageStore.getThemeClass('', 'text-white')">
            MEMOKU
          </span>
        </div>
      </NuxtLink>
      <ul class="h-full mt-8">
        <NuxtLink
          v-for="menu in menuStore.menus"
          :key="menu.code"
          :to="menu.href"
          :area-label="menu.name"
          :target="menu.target">
          <li
            class="relative | flex items-center gap-2 | py-1.5 px-4"
            :class="
              menu.href === route.path
                ? storageStore.getThemeClass('bg-slate-100', 'bg-slate-950')
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
      <Footer />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useMenuStore } from '~/store/menu.store'
import { useStorageStore } from '~/store/storage.store'

const menuStore = useMenuStore()
const storageStore = useStorageStore()

const route = useRoute()
</script>

<style></style>
