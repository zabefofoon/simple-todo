<template>
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

    <span class="text-sm" :class="storageStore.getThemeClass('', 'text-white')">
      v{{ packageJson.version }}
    </span>
  </footer>
</template>

<script setup lang="ts">
import packageJson from '~/package.json'
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
</script>

<style></style>
