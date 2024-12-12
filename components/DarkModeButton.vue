<template>
  <button
    class="flex | relative | text-theme"
    name="Notification"
    @click="
      storageStore.setTheme(storageStore.theme === 'white' ? 'dark' : 'white')
    ">
    <i
      v-if="storageStore.theme === 'white'"
      class="icon icon-light | text-xl"></i>
    <i v-else class="icon icon-dark | text-xl"></i>
  </button>
</template>

<script setup lang="ts">
const storageStore = useStorageStore()
</script>
