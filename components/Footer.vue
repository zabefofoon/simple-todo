<template>
  <footer class="px-3 py-2 | text-center">
    <span class="text-sm" :class="storageStore.getThemeClass('', 'text-white')">
      version {{ packageJson.version }}
    </span>
  </footer>
</template>

<script setup lang="ts">
import packageJson from '~/package.json'
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
</script>

<style></style>
