<template>
  <button
    class="flex"
    @click="
      storageStore.display === 'thumbnail'
        ? storageStore.setDisplay('row')
        : storageStore.setDisplay('thumbnail')
    ">
    <i
      v-if="storageStore.display === 'thumbnail'"
      class="icon icon-grid | text-lg"
      :class="storageStore.getThemeClass('', 'text-white')"></i>
    <i
      v-else
      class="icon icon-row | text-lg"
      :class="storageStore.getThemeClass('', 'text-white')"></i>
  </button>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
</script>