<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <HeaderInner :label="i18n.t('Notification')" />
    </template>
    <div class="w-full h-full | flex flex-col lg:flex-row gap-4">
      <Spinner v-if="loadingStore.todoLoading" class="w-full h-full" />
      <template v-else>
        <div
          v-if="!alarms?.length"
          class="w-full h-full | flex items-center justify-center"
          :class="storageStore.getThemeClass('', 'text-white')">
          {{ i18n.t('EmptyNotification') }}
        </div>
        <ul v-else class="flex flex-col | w-full h-full">
          <NuxtLinkLocale
            v-for="todo in alarms"
            :key="todo.id"
            :to="`/?todo=${todo.id}`"
            :area-label="`Todo ${todo.id}`"
            @click="alarmStore.addReadNewAlarm(todo.id!)">
            <li
              class="flex flex-col gap-0.5 | border-b | p-3 | text-sm lg:text-base"
              :class="{
                [storageStore.getThemeClass('bg-gray-200', 'bg-gray-950')]:
                  checkRead(todo.id!),
                'opacity-30': checkRead(todo.id!),
                'border-slate-700': storageStore.theme === 'dark',
              }">
              <h4 class="relative | flex items-center gap-0.5 | font-bold">
                <div
                  v-if="!checkRead(todo.id!)"
                  class="absolute top-[2px] left-[2px] | aspect-square w-1.5 | bg-red-500 | rounded-full"></div>
                <i
                  class="icon icon-notification | text-lg | flex-shrink-0"
                  :class="storageStore.getThemeClass('', 'text-white')"></i>
                <span :class="storageStore.getThemeClass('', 'text-white')">
                  Check!
                </span>
                <span
                  class="ml-auto | text-xs font-normal"
                  :class="storageStore.getThemeClass('', 'text-white')">
                  {{ todo.date }} {{ todo.time }}
                </span>
              </h4>
              <p
                class="lg:w-[50%] | truncate"
                :class="storageStore.getThemeClass('', 'text-white')">
                {{ todo.description }}
              </p>
            </li>
          </NuxtLinkLocale>
        </ul>
      </template>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo'
import { useAlarmStore } from '~/store/alarm.store'
import { useLoadingStore } from '~/store/loading.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

const i18n = useI18n()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const loadingStore = useLoadingStore()
const alarmStore = useAlarmStore()
const checkRead = (id: string) => alarmStore.readNewAlarms?.includes(id)

const alarms = computed(() => {
  return <Todo[]>(
    (
      alarmStore.newAlarms?.map((alarm) =>
        todoStore.todos?.find((todo) => todo.id === alarm)
      ) || []
    )
      .filter((todo) => !!todo)
      .slice(0, 30)
  )
})

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
