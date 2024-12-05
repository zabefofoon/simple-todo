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
  <div class="flex flex-col gap-4 | p-4">
    <div
      class="flex flex-col | border rounded-lg | p-4 pb-0"
      :class="storageStore.getThemeClass('', 'border-slate-700')">
      <h3
        class="font-bold | pb-2"
        :class="storageStore.getThemeClass('', 'text-white')"
        v-t="'View'"></h3>
      <SettingPermissions />
      <SettingLanguage />
      <SettingTheme />
      <SettingTag />
      <SettingForm />
    </div>
    <div
      class="flex flex-col | border rounded-lg | p-4"
      :class="storageStore.getThemeClass('', 'border-slate-700')">
      <h3
        class="font-bold | pb-2"
        :class="storageStore.getThemeClass('', 'text-white')"
        v-t="'Google'"></h3>
      <SettingGoogle />
    </div>
    <div
      class="flex flex-col | border rounded-lg | p-4 pb-0"
      :class="storageStore.getThemeClass('', 'border-slate-700')">
      <h3
        class="font-bold | pb-2"
        :class="storageStore.getThemeClass('', 'text-white')"
        v-t="'Data'"></h3>
      <SettingDataExport />
      <SettingDataImport />
      <SettingInit v-if="false" />
    </div>
    <div
      class="flex flex-col | border rounded-lg"
      :class="storageStore.getThemeClass('', 'border-slate-700')">
      <Footer />
    </div>
    <SiteInfo v-if="settingStore.screen === 'sm'" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'layout-basic',
})

const i18n = useI18n()

const storageStore = useStorageStore()
const settingStore = useSettingStore()

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
