<template>
  <div class="h-full | flex flex-col">
    <div
      class="sticky top-0 z-10 | hidden lg:flex items-center gap-1 | px-4 py-2 | border-b"
      :class="
        storageStore.getThemeClass('bg-white', 'bg-slate-900 border-slate-700')
      ">
      <SearchInputButton />
      <DarkModeButton />
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
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'layout-basic',
  buttons: ['new'],
})

const storageStore = useStorageStore()
const settingStore = useSettingStore()

const i18n = useI18n()
</script>
