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

const settingStore = useSettingStore()
</script>
