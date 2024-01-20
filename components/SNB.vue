<template>
  <aside class="flex-shrink-0 | hidden lg:block | w-[240px] h-full | border-r border-slate-200">
    <nav class="flex flex-col | h-full">
      <NuxtLink to="/">
        <div class="py-4 | text-center font-bold">MEMOO</div>
      </NuxtLink>
      <ul class="h-full">
        <ClientOnly>
          <NuxtLink
            v-for="menu in menuStore.menus"
            :key="menu.code"
            :to="menu.href">
            <li class="flex items-center gap-2 | py-1.5 px-3">
              <i class="icon" :class="menu.icon"></i>
              <span>{{ $t(menu.name) }}</span>
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
</script>

<style></style>
