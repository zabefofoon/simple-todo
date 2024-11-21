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
      class="icon icon-grid | text-xl"
      :class="storageStore.getThemeClass('', 'text-white')"></i>
    <i
      v-else
      class="icon icon-row | text-xl"
      :class="storageStore.getThemeClass('', 'text-white')"></i>
  </button>
</template>

<script setup lang="ts">
const storageStore = useStorageStore()
</script>
