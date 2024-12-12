<template>
  <div class="h-full | flex flex-col">
    <div
      class="sticky top-0 z-10 | hidden lg:flex items-center gap-1 | px-4 py-2 | border-b border-theme | bg-theme-3">
      <SearchInputButton />
      <DarkModeButton />
      <NotificationButton />
    </div>
    <div
      class="lg:h-[94.5%] | flex flex-col lg:flex-row gap-3 | px-2 py-4 lg:p-3 | bg-theme-3">
      <div class="w-full h-full | flex flex-col gap-3">
        <NuxtLinkLocale
          v-if="settingStore.screen === 'sm'"
          to="/news"
          class="text-theme | relative | flex items-center justify-between | bg-theme-3 | border border-theme rounded-lg | p-4">
          <h3 class="font-bold" v-t="'NewsTitle'"></h3>
          <i class="icon icon-arrow-right"></i>

          <div
            class="absolute top-3.5 left-3 | aspect-square w-2 | bg-red-500 | rounded-full"></div>
        </NuxtLinkLocale>
        <Summary />
        <ScheduledTodo />
        <RecentTodos />
      </div>
      <div
        v-if="settingStore.screen === 'lg'"
        class="flex-shrink-0 h-full overflow-hidden | flex flex-col gap-3">
        <Clock />
        <HomeCalendar />
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
</script>
