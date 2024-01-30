<template>
  <NuxtLayout name="layout-basic">
    <div
      class="sticky top-0 z-10 | hidden lg:flex items-center gap-1 | bg-white | px-4 py-2 | border-b">
      <NuxtLink class="w-full max-w-[50%] | relative" to="/search">
        <input
          class="w-full | px-3 py-1 | bg-slate-200 | rounded-full | text-sm"
          :placeholder="$t('Search')" />
        <i
          class="icon icon-search | text-xl | absolute right-1 top-1/2 -translate-y-1/2"></i>
      </NuxtLink>
      <NotificationButton />
    </div>
    <div class="flex flex-col gap-4 | p-4">
      <div class="flex flex-col | border rounded-lg | p-4 pb-0">
        <h3 class="font-bold | pb-2">{{ $t('View') }}</h3>
        <SettingLanguage />
        <SettingTheme />
        <SettingDisplay />
        <SettingTag />
        <SettingForm />
      </div>
      <div class="flex flex-col | border rounded-lg | p-4 pb-0">
        <h3 class="font-bold | pb-2">{{ $t('Data') }}</h3>
        <SettingDataExport />
        <SettingDataImport />
        <SettingInit />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style></style>
