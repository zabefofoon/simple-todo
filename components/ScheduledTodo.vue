<template>
  <div
    v-if="loadingStore.todoLoading"
    class="flex flex-col gap-2 | border rounded-lg | p-2 lg:p-4"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <Skeletor class="w-1/4 h-[24px]" />
    <Skeletor class="w-full h-[24px]" />
  </div>
  <div
    v-else
    class="flex flex-col gap-2 | border rounded-lg | p-2 lg:p-4"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <h3 class="font-bold">
      <span
        v-if="scheduledTodo"
        :class="storageStore.getThemeClass('', 'text-white')">
        {{ $t('ScheduledTodo') }}
        ({{ scheduledTodo.date?.replaceAll('-', '.').substring(2) }})
      </span>
      <span v-else :class="storageStore.getThemeClass('', 'text-white')">{{
        $t('NoScheduled')
      }}</span>
    </h3>
    <NuxtLink
      v-if="scheduledTodo?.description"
      :to="`/todo/${scheduledTodo.id}`">
      <p>
        <span v-if="scheduledTodo.description.length > 100">
          {{ scheduledTodo.description.slice(0, 100) }}...
        </span>
        <span v-else>
          {{ scheduledTodo.description }}
        </span>
      </p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from '~/store/loading.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

const todoStore = useTodoStore()
const loadingStore = useLoadingStore()
const storageStore = useStorageStore()

const scheduledTodo = computed(() => {
  return todoStore.todos
    ?.filter((todo) => todo.uptoTime && todo.uptoTime > new Date().getTime())
    ?.sort((a, b) => Number(a?.uptoTime || 0) - Number(b?.uptoTime || 0))
    .slice(0, 1)
    .at(0)
})
</script>

<style></style>
