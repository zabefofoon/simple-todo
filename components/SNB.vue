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
      <NuxtLink to="/">
        <div
          class="py-2.5 | text-center font-bold | flex justify-center items-center gap-1">
          <img
            class="w-[20px] aspect-square"
            :class="storageStore.getThemeClass('', 'w-[32px] border-white border-4 | rounded-full')"
            src="~/assets/images/logo-75x75.png"
            alt="MEMOO" />
          <span :class="storageStore.getThemeClass('', 'text-white')">
            MEMOO
          </span>
        </div>
      </NuxtLink>
      <ul class="h-full">
        <NuxtLink
          v-for="menu in menuStore.menus"
          :key="menu.code"
          :to="menu.href">
          <li class="relative | flex items-center gap-2 | py-1.5 px-4">
            <i
              class="icon"
              :class="[
                menu.icon,
                storageStore.getThemeClass('', 'text-white'),
              ]"></i>
            <span :class="storageStore.getThemeClass('', 'text-white')">
              {{ $t(menu.name) }}
            </span>
            <div
              v-if="menu.href === route.path"
              class="w-1 h-1 | rounded-full"
              :class="storageStore.getThemeClass('bg-slate-800', 'bg-white')"></div>
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
