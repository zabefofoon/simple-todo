<template>
  <NuxtLayout name="layout-basic">
    <div class="h-full | flex flex-col">
      <div
        class="sticky top-0 z-10 | hidden lg:flex items-center gap-1 | px-4 py-2 | border-b"
        :class="
          storageStore.getThemeClass(
            'bg-white',
            'bg-slate-900 border-slate-700'
          )
        ">
        <SearchInputButton />
        <DarkModeButton />
        <ChangeDisplayButton />
        <NotificationButton />
      </div>
      <div
        class="lg:h-[94.5%] | flex flex-col lg:flex-row gap-3 | px-2 py-4 lg:p-3"
        :class="storageStore.getThemeClass('bg-white', '')">
        <div class="w-full h-full | flex flex-col gap-3">
          <NuxtLinkLocale
            v-if="settingStore.screen === 'sm'"
            to="/news"
            class="relative | flex items-center justify-between | border rounded-lg | p-4"
            :class="
              storageStore.getThemeClass(
                'bg-white',
                'border-slate-700 bg-slate-850'
              )
            ">
            <h3
              class="font-bold"
              :class="storageStore.getThemeClass('', 'text-white')">
              {{ i18n.t('NewsTitle') }}
            </h3>
            <i class="icon icon-arrow-right"></i>

            <div
              class="absolute top-3.5 left-3 | aspect-square w-2 | bg-red-500 | rounded-full"></div>
          </NuxtLinkLocale>
          <ScheduledTodo />
          <RecentTodos />
          <Summary v-if="settingStore.screen === 'lg'" class="hidden lg:flex" />
        </div>
        <div
          v-if="settingStore.screen === 'lg'"
          class="flex flex-col gap-3 | h-full">
          <Clock />
          <HomeCalendar />
        </div>
        <div v-if="settingStore.screen === 'sm'" class="w-full | lg:hidden">
          <Summary />
        </div>
      </div>
    </div>
    <template #actions>
      <FloatingButtonsSearch />
      <FloatingButtonsNew />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useSettingStore } from '~/store/setting.store'
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
const settingStore = useSettingStore()

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
  ],
})
</script>
