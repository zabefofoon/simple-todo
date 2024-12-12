<template>
  <div
    class="sticky top-0 z-10 | hidden lg:flex items-center gap-1 | px-4 py-2 | border-b border-theme | bg-theme-3">
    <SearchInputButton />
    <DarkModeButton />
    <NotificationButton />
  </div>
  <div class="h-full | lg:px-4">
    <Calendar />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'layout-basic',
  buttons: ['new', 'search'],
})

const storageStore = useStorageStore()

useHead(() => ({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
}))
</script>
