<template>
  <UIModal
    modal-name="NotificationModal"
    class="ml-auto transition-all"
    :class="
      storageStore.isSNBExpanded
        ? 'lg:w-[calc(100vw-240px)]'
        : 'lg:w-[calc(100vw-52px)]'
    "
    content-class="border-t border-theme | w-full h-full | bg-theme-3"
    overlay-class="ml-auto"
    hide-close
    :content-transition="settingStore.screen === 'lg' ? 'none' : 'slide-right'"
    @close="emit('close')">
    <HeaderInner :label="i18n.t('Notification')" />

    <div class="w-full h-full | flex flex-col lg:flex-row gap-4">
      <Spinner v-if="loadingStore.todoLoading" class="w-full h-full" />
      <template v-else>
        <div
          v-if="!alarms?.length"
          class="w-full h-full | flex items-center justify-center | text-theme"
          v-t="'EmptyNotification'"></div>
        <ul v-else class="flex flex-col | w-full h-full">
          <NuxtLinkLocale
            v-for="todo in alarms"
            :key="todo.id"
            :to="getUrl(todo)"
            :area-label="`Todo ${todo.id}`"
            @click="alarmStore.addReadNewAlarm(todo.id!)">
            <li
              class="flex flex-col gap-0.5 | border-b | p-3 | text-sm lg:text-base border-theme"
              :class="{
                'bg-gray-200 dark:bg-gray-950': checkRead(todo.id!),
                'opacity-30': checkRead(todo.id!),
              }">
              <h4
                class="relative | flex items-center gap-0.5 | font-bold text-theme">
                <div
                  v-if="!checkRead(todo.id!)"
                  class="absolute top-[2px] left-[2px] | aspect-square w-1.5 | bg-red-500 | rounded-full"></div>
                <i class="icon icon-notification | text-lg | flex-shrink-0"></i>
                <span> Check! </span>
                <span class="ml-auto | text-xs font-normal">
                  {{ todo.date }} {{ todo.time }}
                </span>
              </h4>
              <p class="lg:w-[50%] | truncate text-theme">
                {{ todo.description }}
              </p>
            </li>
          </NuxtLinkLocale>
        </ul>
      </template>
    </div>
  </UIModal>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const i18n = useI18n()
const route = useRoute()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const loadingStore = useLoadingStore()
const settingStore = useSettingStore()
const alarmStore = useAlarmStore()
const checkRead = (id: string) => alarmStore.readNewAlarms?.includes(id)

const alarms = computed(() => {
  return (
    alarmStore.newAlarms?.map<Todo | undefined>((alarm) =>
      todoStore.todos?.find((todo) => todo.id === alarm)
    ) || []
  )
    .filter((todo) => !!todo)
    .slice(0, 30)
})

const getUrl = (todo: Todo) => {
  const query = routerUtil.queryToString(route.query)
  return !query
    ? `${route.path}?todo=${todo?.id}`
    : `${route.path}?${query}&todo=${todo?.id}`
}
</script>
