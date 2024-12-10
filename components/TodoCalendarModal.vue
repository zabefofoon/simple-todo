<template>
  <UIModal
    modal-name="TodoCalendarModal"
    class="ml-auto transition-all"
    :class="
      storageStore.isSNBExpanded
        ? 'lg:w-[calc(100vw-240px)]'
        : 'lg:w-[calc(100vw-52px)]'
    "
    :content-class="`border-t | w-full h-full | ${storageStore.getThemeClass(
      'bg-white',
      'bg-slate-900 | border-slate-700'
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
        <div
          v-else
          class="h-full | flex flex-col gap-2 | p-4 | min-h-full"
          :class="{ 'justify-center': !todayTodos?.length }">
          <TodoRow v-for="todo in todayTodos" :key="todo.id" :todo="todo" />
        </div>
      </template>
    </div>
    <nav class="fixed right-4 bottom-4 z-10">
      <FloatingButtonsNew />
    </nav>
  </UIModal>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()

const i18n = useI18n()

const route = useRoute()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const loadingStore = useLoadingStore()
const settingStore = useSettingStore()
const googleStore = useGoogleStore()

const todayTodos = computed(() =>
  todoStore.todos?.filter((todo) => todo.createdDate === route.query.calendar)
)
</script>
