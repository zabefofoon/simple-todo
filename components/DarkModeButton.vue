<template>
  <button
    class="flex | relative"
    name="Notification"
    @click="
      storageStore.setTheme(storageStore.theme === 'white' ? 'dark' : 'white')
    ">
    <i
      v-if="storageStore.theme === 'white'"
      class="icon icon-light | text-xl"
      :class="storageStore.getThemeClass('', 'text-white')"></i>
    <i
      v-else
      class="icon icon-dark | text-xl"
      :class="storageStore.getThemeClass('', 'text-white')"></i>
  </button>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
</script>
