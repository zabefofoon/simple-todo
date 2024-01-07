<template>
  <aside class="hidden lg:block | w-[240px] h-full | border">
    <nav class="flex flex-col | h-full">
      <NuxtLink to="/">
        <div class="py-4 | border | text-center">LOGO</div>
      </NuxtLink>
      <ul class="h-full">
        <ClientOnly>
          <NuxtLink
            v-for="menu in menuStore.menus"
            :key="menu.code"
            :to="menu.href">
            <li class="flex items-center gap-2 | py-1 px-3">
              <i class="icon" :class="menu.icon"></i>
              <span>{{ menu.name }}</span>
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
