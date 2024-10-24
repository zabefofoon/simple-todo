<template>
  <NuxtLayout name="layout-basic">
    <div
      class="sticky top-0 z-10 | hidden lg:flex items-center gap-1 | px-4 py-2 | border-b"
      :class="
        storageStore.getThemeClass('bg-white', 'bg-slate-900 border-slate-700')
      ">
      <SearchInputButton />
      <DarkModeButton />
      <ChangeDisplayButton />
      <NotificationButton />
    </div>
    <div class="flex flex-col gap-4 | p-4">
      <div
        class="flex flex-col | border rounded-lg | p-4 pb-0"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
        <h3
          class="font-bold | pb-2"
          :class="storageStore.getThemeClass('', 'text-white')">
          {{ i18n.t('View') }}
        </h3>
        <SettingPermissions />
        <SettingLanguage />
        <SettingTheme />
        <SettingDisplay />
        <SettingTag />
        <SettingForm />
      </div>
      <div
        class="flex flex-col | border rounded-lg | p-4"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
        <h3
          class="font-bold | pb-2"
          :class="storageStore.getThemeClass('', 'text-white')">
          {{ i18n.t('Google') }}
        </h3>
        <SettingGoogle />
      </div>
      <div
        class="flex flex-col | border rounded-lg | p-4 pb-0"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
        <h3
          class="font-bold | pb-2"
          :class="storageStore.getThemeClass('', 'text-white')">
          {{ i18n.t('Data') }}
        </h3>
        <SettingDataExport />
        <SettingDataImport />
        <SettingInit v-if="false" />
      </div>
      <div
        class="flex flex-col | border rounded-lg"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
        <Footer />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'

const i18n = useI18n()

const storageStore = useStorageStore()

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
  ],
})
</script>
