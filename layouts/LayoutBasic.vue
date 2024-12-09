<template>
  <div
    class="flex | w-screen h-dvh overflow-hidden | border-t"
    :class="
      storageStore.getThemeClass('bg-white', 'bg-slate-900 border-slate-700')
    ">
    <BulkButtons v-if="route.query.bulk" />
    <SNB v-if="settingStore.screen === 'lg'" />
    <div class="flex flex-col | h-full w-full overflow-hidden">
      <slot name="header"><Header v-if="settingStore.screen !== 'lg'" /></slot>
      <main
        id="scroll-area"
        ref="scrollArea"
        class="flex flex-col | h-full"
        :class="lockScrollClass"
        @scroll="checkShowScrollTop">
        <slot />
      </main>
      <nav class="relative">
        <FloatingButtons
          v-if="!route.query.bulk"
          :is-show-scroll-top="isShowScrollTop"
          @scroll-top="scrollTop">
          <FloatingButtonsNew v-if="route.meta.buttons?.includes('new')" />
          <FloatingButtonsSearch
            v-if="route.meta.buttons?.includes('search')" />
        </FloatingButtons>
        <BottomAppBar v-if="settingStore.screen !== 'lg'" />
      </nav>
    </div>
  </div>
  <ClientOnly>
    <ModalsContainer />
    <SnackbarContainer />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ModalsContainer, useModal } from 'vue-final-modal'
import NotificationModal from '~/components/NotificationModal.vue'
import SearchModal from '~/components/SearchModal.vue'
import TodoCalendarModal from '~/components/TodoCalendarModal.vue'
import TodoDetailModal from '~/components/TodoDetailModal.vue'
import TodoEditModal from '~/components/TodoEditModal.vue'
import TodoFormModal from '~/components/TodoFormModal.vue'
import TodoTagsModal from '~/components/TodoTagsModal.vue'

const route = useRoute()

const scrollStore = useScrollStore()
const storageStore = useStorageStore()
const settingStore = useSettingStore()

const scrollArea = ref<HTMLDivElement>()
const scrollTop = () =>
  toValue(scrollArea)?.scrollTo({ top: 0, behavior: 'smooth' })

const isShowScrollTop = ref(false)
const checkShowScrollTop = () => {
  const scrollTop = toValue(scrollArea)?.scrollTop || 0
  isShowScrollTop.value = scrollTop > 10
}

const lockScrollClass = computed(() =>
  scrollStore.scrollLocked
    ? 'overflow-hidden lg:overflow-auto'
    : 'overflow-auto'
)

onMounted(() => {
  checkShowScrollTop()
})

const { open: openTodoDetailModal, close: closeTodoDetailModal } = useModal({
  component: TodoDetailModal,
  attrs: {
    onClose: () => {
      history.back()
    },
  },
})
watch(
  () => route.query.todo,
  (todo) => {
    todo ? openTodoDetailModal() : closeTodoDetailModal()
  },
  { immediate: true }
)

const { open: openTodoEditMoal, close: closeTodoEditMoal } = useModal({
  component: TodoEditModal,
  attrs: {
    onClose: () => {
      history.back()
    },
  },
})
watch(
  () => route.query.edit,
  (edit) => {
    edit ? openTodoEditMoal() : closeTodoEditMoal()
  },
  { immediate: true }
)

const { open: openTodoTagsMoal, close: closeTodoTagsMoal } = useModal({
  component: TodoTagsModal,
  attrs: {
    onClose: () => {
      history.back()
    },
  },
})
watch(
  () => route.query.tags,
  (tags) => {
    tags ? openTodoTagsMoal() : closeTodoTagsMoal()
  },
  { immediate: true }
)

const { open: openTodoCalendarMoal, close: closeTodoCalendarMoal } = useModal({
  component: TodoCalendarModal,
  attrs: {
    onClose: () => {
      history.back()
    },
  },
})
watch(
  () => route.query.calendar,
  (calendar) => {
    calendar ? openTodoCalendarMoal() : closeTodoCalendarMoal()
  },
  { immediate: true }
)

const { open: openTodoFormModal, close: closeTodoFormModal } = useModal({
  component: TodoFormModal,
  attrs: {
    onClose: () => {
      history.back()
    },
  },
})
watch(
  () => route.query.form,
  (form) => {
    form ? openTodoFormModal() : closeTodoFormModal()
  },
  { immediate: true }
)

const { open: openSearchModal, close: closeSearchModal } = useModal({
  component: SearchModal,
  attrs: {
    onClose: () => {
      history.back()
    },
  },
})
watch(
  () => route.query.search,
  (search) => {
    search === 'true' ? openSearchModal() : closeSearchModal()
  },
  { immediate: true }
)

const { open: openNotificationModal, close: closeNotificationModal } = useModal(
  {
    component: NotificationModal,
    attrs: {
      onClose: () => {
        history.back()
      },
    },
  }
)
watch(
  () => route.query.notification,
  (notification) => {
    notification === 'true' ? openNotificationModal() : closeNotificationModal()
  },
  { immediate: true }
)
</script>
