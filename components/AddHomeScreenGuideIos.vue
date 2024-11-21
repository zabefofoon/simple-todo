<template>
  <div
    v-if="guideStore.isShowAddHomeGuide"
    class="w-full max-w-[92%] lg:w-fit | fixed bottom-16 lg:bottom-[unset] top-[unset] lg:top-5 right-1/2 lg:right-5 z-[20] translate-x-1/2 lg:translate-x-0 | border | p-4 | flex flex-col gap-3"
    :class="
      storageStore.getThemeClass(
        'bg-white',
        'bg-slate-800 border-slate-700 text-white'
      )
    ">
    <button
      class="absolute top-1 right-1 | flex"
      @click="guideStore.showAddHomeGuide(false)">
      <i
        class="icon icon-close"
        :class="storageStore.getThemeClass('', 'text-white')"></i>
    </button>
    {{ i18n.t('AddHome') }}
    <ul class="text-sm | flex flex-col gap-2">
      <li
        class="flex items-center gap-2"
        :class="storageStore.getThemeClass('', 'text-white')">
        1. {{ i18n.t('IosAddHome1') }}
        <span class="flex">
          <i
            class="icon icon-ios-share | text-xl"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
        </span>
      </li>
      <li :class="storageStore.getThemeClass('', 'text-white')">
        2. {{ i18n.t('IosAddHome2') }}
      </li>
      <li
        class="flex flex-col"
        :class="storageStore.getThemeClass('', 'text-white')">
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
const storageStore = useStorageStore()
const guideStore = useGuideStore()
const i18n = useI18n()
</script>
