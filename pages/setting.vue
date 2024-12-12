<template>
  <div
    class="sticky top-0 z-10 | hidden lg:flex items-center gap-1 | px-4 py-2 | border-b border-theme | bg-theme-3">
    <SearchInputButton />
    <DarkModeButton />
    <NotificationButton />
  </div>
  <div class="flex flex-col gap-4 | p-4">
    <div class="flex flex-col | border border-theme rounded-lg | p-4 pb-0">
      <h3 class="font-bold text-theme | pb-2" v-t="'View'"></h3>
      <SettingPermissions />
      <SettingLanguage />
      <SettingTheme />
      <SettingTag />
      <SettingForm />
    </div>
    <div class="flex flex-col | border border-theme rounded-lg | p-4">
      <h3 class="font-bold text-theme | pb-2" v-t="'Google'"></h3>
      <SettingGoogle />
    </div>
    <div class="flex flex-col | border rounded-lg border-theme | p-4 pb-0">
      <h3 class="font-bold text-theme | pb-2" v-html="'Data'"></h3>
      <SettingDataExport />
      <SettingDataImport />
      <SettingInit v-if="false" />
    </div>
    <div class="flex flex-col | border rounded-lg border-theme">
      <Footer />
    </div>
    <SiteInfo v-if="settingStore.screen === 'sm'" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'layout-basic',
})

const settingStore = useSettingStore()

useHead(() => ({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
}))
</script>
