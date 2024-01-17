<template>
  <NuxtLayout name="layout-basic">
    <div class="h-full | flex flex-col">
      <div
        class="sticky top-0 z-10 | hidden lg:flex items-center gap-1 | bg-white | px-4 py-2 | border-b">
        <NuxtLink class="w-full max-w-[50%] | relative" to="/search">
          <input
            class="w-full | px-3 py-1 | bg-slate-200 | rounded-full | text-sm"
            placeholder="Search" />
          <i
            class="icon icon-search | text-xl | absolute right-1 top-1/2 -translate-y-1/2"></i>
        </NuxtLink>
        <NotificationButton />
      </div>
      <div class="flex flex-col lg:flex-row gap-4 | p-2 lg:p-4">
        <div class="w-full | flex flex-col gap-4">
          <ScheduledTodo />
          <RecentTodos />
          <Summary class="hidden lg:flex" />
        </div>
        <Calender />
        <div class="w-full | lg:hidden">
          <Summary />
        </div>
      </div>
    </div>
    <template #actions>
      <ClientOnly>
        <NuxtLink
          to="/search"
          class="flex | bg-black rounded-full | text-white | p-2">
          <i class="icon icon-search text-2xl"></i>
        </NuxtLink>
        <NuxtLink
          to="/todo/new"
          class="flex | bg-black rounded-full | text-white | p-2">
          <i class="icon icon-add text-2xl"></i>
        </NuxtLink>
      </ClientOnly>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style></style>
