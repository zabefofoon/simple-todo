<template>
  <div
    v-if="loadingStore.todoLoading"
    class="flex flex-col gap-2 | border border-theme bg-theme-3 rounded-lg | p-4">
    <!-- <Skeletor class="w-1/4 h-[24px]" /> -->
    <Skeletor class="w-full h-[24px]" />
  </div>
  <div
    v-else-if="
      settingStore.screen === 'lg' ||
      (settingStore.screen === 'sm' && scheduledTodo)
    "
    class="flex flex-col gap-2 | border border-theme bg-theme-3 rounded-lg | p-2 lg:p-4">
    <h3 class="font-bold">
      <span v-if="scheduledTodo" class="text-theme">
        <span v-t="'ScheduledTodo'"></span>
        ({{ scheduledTodo.date?.replaceAll('-', '.').substring(2) }})
      </span>
      <span v-else class="text-theme" v-t="'NoScheduled'"> </span>
    </h3>
    <NuxtLinkLocale
      v-if="scheduledTodo?.description"
      :to="`/?todo=${scheduledTodo.id}`"
      area-label="ScheduledTodo">
      <p>
        <span class="text-theme text-sm | truncate-2">
          {{ scheduledTodo.description }}
        </span>
      </p>
    </NuxtLinkLocale>
  </div>
</template>

<script setup lang="ts">
const todoStore = useTodoStore()
const loadingStore = useLoadingStore()
const settingStore = useSettingStore()

const scheduledTodo = computed(() => {
  return todoStore.todos
    ?.filter((todo) => todo.upto)
    .filter((todo) => Number(todo.uptoTime) > new Date().getTime())
    .sort((a, b) => Number(a?.uptoTime || 0) - Number(b?.uptoTime || 0))
    .slice(0, 1)
    .at(0)
})
</script>
