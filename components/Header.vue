<template>
  <header class="relative z-30 | lg:hidden">
    <div
      class="flex items-center gap-1.5 | relative z-30 | px-4 py-3 | border-b"
      :class="
        storageStore.getThemeClass(
          'bg-white',
          'bg-slate-900 | border-slate-700'
        )
      ">
      <NuxtLinkLocale
        class="block | w-full | font-bold"
        to="/"
        area-label="Home">
        <div class="flex items-center justify-center gap-1.5 | w-fit">
          <img
            class="w-[20px] aspect-square"
            :class="
              storageStore.getThemeClass('', 'invert contrast-100 grayscale')
            "
            src="~/assets/images/logo.svg"
            alt="MEMOKU" />
          <span :class="storageStore.getThemeClass('', 'text-white')">
            MEMOKU
          </span>
        </div>
      </NuxtLinkLocale>
      <DarkModeButton />
      <ChangeDisplayButton />
      <NotificationButton />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
</script>
