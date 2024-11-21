<template>
  <div class="loader" :class="{ dark: storageStore.theme === 'dark' }"></div>
</template>

<script setup lang="ts">
const storageStore = useStorageStore()
</script>

<style lang="scss">
.loader {
  min-width: 10px;
  min-height: 10px;
  background: #eee;
  background: linear-gradient(90deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;

  &.dark {
    background: linear-gradient(90deg, #2c2e38 8%, #383d52 18%, #2c2e38 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
  }
}
@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
