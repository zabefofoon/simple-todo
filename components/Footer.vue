<template>
  <footer class="px-3 py-2 | text-center | flex items-center">
    <span class="ml-auto | text-sm">v{{ packageJson.version }}</span>
  </footer>
</template>

<script setup lang="ts">
import packageJson from '~/package.json'
</script>

<style></style>
