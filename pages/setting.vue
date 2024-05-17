<template>
  <NuxtLayout name="layout-basic">
    <div
      class="sticky top-0 z-10 | hidden lg:flex items-center gap-1 | px-4 py-2 | border-b"
      :class="
        storageStore.getThemeClass('bg-white', 'bg-slate-900 border-slate-700')
      ">
      <SearchInputButton />
      <DarkModeButton/>
      <NotificationButton />
    </div>
    <div class="flex flex-col gap-4 | p-4">
      <div
        class="flex flex-col | border rounded-lg | p-4 pb-0"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
        <h3
          class="font-bold | pb-2"
          :class="storageStore.getThemeClass('', 'text-white')">
          {{ $t('View') }}
        </h3>
        <SettingPermissions/>
        <SettingLanguage />
        <SettingTheme />
        <SettingDisplay />
        <SettingTag />
        <SettingForm />
      </div>
      <div
        class="flex flex-col | border rounded-lg | p-4 pb-0"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
        <h3
          class="font-bold | pb-2"
          :class="storageStore.getThemeClass('', 'text-white')">
          {{ $t('Data') }}
        </h3>
        <SettingDataExport />
        <SettingDataImport />
        <SettingInit v-if="false" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
</script>

<style></style>
