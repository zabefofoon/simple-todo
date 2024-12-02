<template>
  <div
    class="lg:h-full lg:max-h-[100vw] | overflow-auto | flex flex-col gap-5 | border rounded-lg | p-2 lg:p-3"
    :class="storageStore.getThemeClass('bg-white', 'border-slate-700')">
    <div>
      <Skeletor v-if="loadingStore.todoLoading" class="w-1/4 h-[24px]" />
      <div v-else class="flex items-center gap-2">
        <button
          :class="[
            storageStore.selectedRecentTab === 'recent'
              ? 'font-bold'
              : 'opacity-70',
            storageStore.getThemeClass('', 'text-white'),
          ]"
          area-label="RecentTodos"
          @click="storageStore.selectRecentTab('recent')">
          {{ i18n.t('Recent') }}
        </button>
        <span class="text-xs">|</span>
        <button
          :class="[
            storageStore.selectedRecentTab === 'plan'
              ? 'font-bold'
              : 'opacity-70',
            storageStore.getThemeClass('', 'text-white'),
          ]"
          area-label="PlannedTodos"
          @click="storageStore.selectRecentTab('plan')">
          {{ i18n.t('Plan') }}
        </button>
      </div>
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
    <template v-else>
      <div
        v-if="isEmptyTodos"
        class="w-full h-full min-h-[100px] | grid place-items-center | pb-8">
        {{ i18n.t('NoTodo') }}
      </div>
      <div v-else class="flex flex-col gap-2">
        <TodoRow
          v-for="todo in storageStore.selectedRecentTab === 'plan'
            ? plannedTodos
            : recentTodos"
          :key="todo.id"
          :todo="todo" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

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

const plannedTodos = computed(() => {
  return todoStore.todos
    ?.slice()
    .filter(
      (todo) =>
        dayjs().startOf('day').toDate() <=
        dayjs(todo.created ?? 0)
          .startOf('day')
          .toDate()
    )
    .filter((todo) => !todo.done)
    .sort((a, b) => Number(a.created) - Number(b.created))
    .slice(0, settingStore.screen === 'lg' ? 12 : 4)
})

const isEmptyTodos = computed(() => {
  if (storageStore.selectedRecentTab === 'recent')
    return !recentTodos.value?.length
  else return !plannedTodos.value?.length
})
</script>
