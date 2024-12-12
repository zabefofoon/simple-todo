<template>
  <header class="relative z-30 | lg:hidden">
    <div
      class="flex items-center gap-1.5 | relative z-30 | px-4 py-3 | border-b border-theme | bg-theme-2">
      <NuxtLinkLocale
        class="block | w-full | font-bold"
        to="/"
        area-label="Home"
        property="url">
        <div class="flex items-center justify-center gap-1.5 | w-fit">
          <img
            class="w-[20px] aspect-square"
            :class="
              storageStore.getThemeClass('', 'invert contrast-100 grayscale')
            "
            src="~/assets/images/logo.svg"
            alt="MEMOKU" />
          <span property="name" class="text-theme"> MEMOKU </span>
        </div>
      </NuxtLinkLocale>

      <DarkModeButton />
      <NuxtLinkLocale to="/memoku" class="flex | relative">
        <span class="icon icon-help | text-xl text-theme"></span>
      </NuxtLinkLocale>
      <NotificationButton />
    </div>
  </header>
</template>

<script setup lang="ts">
const storageStore = useStorageStore()
</script>
