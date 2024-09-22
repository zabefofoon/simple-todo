<template>
  <UIModal
    modal-name="TodoCalendarModal"
    class="ml-auto transition-all"
    :class="
      storageStore.isSNBExpanded
        ? 'lg:w-[calc(100vw-240px)]'
        : 'lg:w-[calc(100vw-52px)]'
    "
    :content-class="`w-full h-full | ${storageStore.getThemeClass(
      'bg-white',
      'bg-slate-900'
    )}`"
    :content-transition="settingStore.screen === 'lg' ? 'none' : 'slide-right'"
    overlay-class="ml-auto"
    hide-close
    @close="emit('close')">
    <HeaderInner
      :label="route.query.calendar?.toString().replaceAll('-', '.') ?? ''" />
    <div class="w-full h-full">
      <Spinner v-if="loadingStore.todoLoading" class="h-full" />
      <template v-else>
        <p
          v-if="!todayTodos?.length"
          class="flex items-center justify-center | h-full">
          <span :class="storageStore.getThemeClass('', 'text-white')">
            {{ i18n.t('NoTodo') }}
          </span>
        </p>
        <template v-else>
          <div
            v-if="storageStore.display === 'thumbnail'"
            class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 | p-4">
            <TodoThumbnail
              v-for="todo in todayTodos"
              :key="todo.id"
              :todo="todo"
              @delete="deleteTodo"
              @done="todoStore.doneTodo" />
          </div>
          <div
            v-else
            class="h-full | flex flex-col gap-2 | p-4 | min-h-full"
            :class="{ 'justify-center': !todayTodos?.length }">
            <TodoRow
              v-for="todo in todayTodos"
              :key="todo.id"
              :todo="todo"
              @delete="deleteTodo"
              @done="todoStore.doneTodo" />
          </div>
        </template>
      </template>
    </div>
    <nav class="fixed right-4 bottom-4 z-10">
      <FloatingButtonsNew />
    </nav>
  </UIModal>
</template>

<script setup lang="ts">
import { useLoadingStore } from '~/store/loading.store'
import { useSettingStore } from '~/store/setting.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const i18n = useI18n()

const route = useRoute()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const loadingStore = useLoadingStore()
const settingStore = useSettingStore()

const todayTodos = computed(() =>
  todoStore.todos?.filter((todo) => todo.createdDate === route.query.calendar)
)

const deleteTodo = (id: number) => {
  if (confirm(i18n.t('ConfirmDelete'))) todoStore.deleteTodo(id)
}
</script>
