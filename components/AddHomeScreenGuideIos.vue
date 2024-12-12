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
        <span v-t="'IosAddHome1'"></span>
        <span class="flex">
          <i class="icon icon-ios-share | text-xl"></i>
        </span>
      </li>
      <li v-t="'IosAddHome2'"></li>
      <li class="flex flex-col">
        <a
          href="https://support.apple.com/en-us/104996#:~:text=In%20Safari%2C%20open%20the%20webpage,use%20as%20a%20web%20app.&text=in%20the%20Safari%20toolbar%2C%20then,Dock%2C%20Launchpad%2C%20or%20Spotlight."
          target="_blank"
          class="underline">
          *Mac.
        </a>
        <a
          href="https://support.apple.com/en-us/104996#:~:text=In%20Safari%2C%20open%20the%20webpage,use%20as%20a%20web%20app.&text=in%20the%20Safari%20toolbar%2C%20then,Dock%2C%20Launchpad%2C%20or%20Spotlight."
          target="_blank"
          class="underline">
          *iphone.
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const guideStore = useGuideStore()
</script>
