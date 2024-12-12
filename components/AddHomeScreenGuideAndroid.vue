<template>
  <div
    class="text-theme | bg-theme-1 w-full max-w-[92%] lg:w-fit | fixed bottom-16 lg:bottom-[unset] top-[unset] lg:top-5 right-1/2 lg:right-5 z-[20] translate-x-1/2 lg:translate-x-0 | border border-theme | p-4 | flex flex-col gap-3">
    <button
      class="absolute top-1 right-1 | flex"
      @click="guideStore.showAddHomeGuide(false)">
      <i class="icon icon-close"></i>
    </button>
    <span v-t="'AddHome'"></span>
    <ul class="text-sm | flex flex-col gap-2">
      <li class="flex items-center gap-2">
        <span class="flex">
          <i class="icon icon-android-home | text-xl"></i>
        </span>
        <span v-t="'AndroidAddHome1'"></span>
      </li>
      <li class="flex flex-col">
        <a
          href="https://support.google.com/chrome/answer/9658361?hl=ko&co=GENIE.Platform%3DDesktop"
          target="_blank"
          class="underline">
          *Chrome Guide.
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const guideStore = useGuideStore()
</script>
