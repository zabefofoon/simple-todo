<template>
  <aside
    class="flex-shrink-0 | hidden lg:block | w-[240px] h-full | border-r border-slate-200">
    <nav class="flex flex-col | h-full">
      <NuxtLink to="/">
        <div
          class="py-4 | text-center font-bold | flex justify-center items-center gap-1">
          <img
            class="w-[20px] aspect-square"
            src="~/assets/images/logo-75x75.png"
            alt="MEMOO" />
          <span>MEMOO</span>
        </div>
      </NuxtLink>
      <ul class="h-full">
        <ClientOnly>
          <NuxtLink
            v-for="menu in menuStore.menus"
            :key="menu.code"
            :to="menu.href">
            <li class="relative | flex items-center gap-2 | py-1.5 px-3">
              <i class="icon" :class="menu.icon"></i>
              <span>
                {{ $t(menu.name) }}
              </span>
              <div
                v-if="menu.href === route.path"
                class="w-1 h-1 | bg-slate-800 rounded-full"></div>
            </li>
          </NuxtLink>
        </ClientOnly>
      </ul>
      <Footer />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useMenuStore } from '~/store/menu.store'

const menuStore = useMenuStore()

const route = useRoute()
</script>

<style></style>
