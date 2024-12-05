<template>
  <div
    class="flex flex-col gap-2 | lg:py-8 lg:px-4 | min-w-[160px]"
    :class="storageStore.getThemeClass('text-slate-400', 'text-slate-500')">
    <div class="flex justify-center lg:justify-evenly gap-4">
      <NuxtLinkLocale
        class="underline text-xs"
        to="/terms.html"
        target="_blank"
        external
        v-t="'Terms'">
      </NuxtLinkLocale>
      <NuxtLinkLocale
        class="underline text-xs"
        to="/privacy-policy.html"
        target="_blank"
        external
        v-t="'Policy'">
      </NuxtLinkLocale>
    </div>
    <p class="text-xs text-center">MEMOKU &copy; 2024 zabefofoon.</p>
  </div>
</template>

<script setup lang="ts">
const storageStore = useStorageStore()
</script>
