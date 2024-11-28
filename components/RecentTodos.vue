<template>
  <div
    class="lg:h-full lg:max-h-[100vw] | overflow-auto | flex flex-col gap-5 | border rounded-lg | p-2 lg:p-3"
    :class="storageStore.getThemeClass('bg-white', 'border-slate-700')">
    <div class="font-bold">
      <Skeletor v-if="loadingStore.todoLoading" class="w-1/4 h-[24px]" />
      <NuxtLinkLocale
        v-else
        to="/todo"
        :class="storageStore.getThemeClass('', 'text-white')"
        area-label="RecentTodos">
        {{ i18n.t('Recent') }}
      </NuxtLinkLocale>
    </div>

    <template v-if="loadingStore.todoLoading">
      <div
        v-if="storageStore.display === 'thumbnail'"
        class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <Skeletor v-for="index in 4" :key="index" class="aspect-square" />
      </div>
      <div v-else class="flex flex-col gap-2">
        <Skeletor v-for="index in 4" :key="index" class="h-[40px]" />
      </div>
    </template>
    <div v-else class="flex flex-col gap-2">
      <TodoRow v-for="todo in recentTodos" :key="todo.id" :todo="todo" />
      <p v-if="!recentTodos?.length" class="text-center py-10">
        {{ i18n.t('NoTodo') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const i18n = useI18n()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const loadingStore = useLoadingStore()
const settingStore = useSettingStore()

const recentTodos = computed(() => {
  return todoStore.todos
    ?.slice()
    .sort((a, b) => Number(b.modified) - Number(a.modified))
    .slice(0, settingStore.screen === 'lg' ? 12 : 4)
})
</script>
