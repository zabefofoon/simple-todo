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
        <NotificationButton />
      </div>
      <div class="flex flex-col lg:flex-row gap-4 | px-2 py-4 lg:p-4">
        <div class="w-full | flex flex-col gap-4">
          <RecentTodos />
          <ScheduledTodo />
          <Summary class="hidden lg:flex" />
        </div>
        <HomeCalendar />
        <div class="w-full | lg:hidden">
          <Summary />
        </div>
      </div>
    </div>
    <template #actions>
      <NuxtLink
        to="/search"
        class="flex | bg-slate-800 rounded-full | text-white | p-2">
        <i class="icon icon-search text-2xl text-white"></i>
      </NuxtLink>
      <NuxtLink
        to="/todo/new"
        class="flex | bg-slate-800 rounded-full | text-white | p-2">
        <i class="icon icon-add text-2xl text-white"></i>
      </NuxtLink>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
</script>

<style></style>
