<template>
  <footer
    class="px-3 py-2 | text-center | flex items-center justify-between gap-2">
    <div class="flex gap-1.5 items-center justify-center | text-theme">
      <NuxtLinkLocale
        to="https://www.threads.net/@sangwwooo/post/C7E92AAv_pz"
        target="_blank"
        class="flex">
        <i class="icon icon-threads"></i>
      </NuxtLinkLocale>
      <NuxtLinkLocale
        to="https://x.com/zabefofoon"
        target="_blank"
        class="flex">
        <i class="icon icon-x text-xs"></i>
      </NuxtLinkLocale>
    </div>

    <span class="text-sm"> v{{ packageJson.version }} </span>
  </footer>
</template>

<script setup lang="ts">
import packageJson from '~/package.json'
</script>
