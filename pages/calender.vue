<template>
  <div
    class="sticky top-0 z-10 | hidden lg:flex items-center gap-1 | px-4 py-2 | border-b"
    :class="
      storageStore.getThemeClass('bg-white', 'bg-slate-900 border-slate-700')
    ">
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

const i18n = useI18n()

useHead({
  title: i18n.t('PageTitle'),
  meta: [
    {
      name: 'description',
      content: i18n.t('PageDescription'),
    },
    {
      name: 'keywords',
      content: i18n.t('PageKeywords'),
    },
    {
      property: 'og:title',
      content: i18n.t('PageTitle'),
    },
    {
      property: 'og:description',
      content: i18n.t('PageDescription'),
    },
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})
</script>
