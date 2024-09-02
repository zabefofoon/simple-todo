<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <header
        class="flex items-center gap-3 | py-2 px-4 | border-b | overflow-hidden"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
        <button name="Back" class="flex" @click="router.back()">
          <i
            class="icon icon-arrow-left"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
        </button>
        <div
          class="w-full | text-lg truncate | cursor-pointer"
          :class="storageStore.getThemeClass('', 'text-white')"
          @click="router.back()">
          {{ route.params.id.toString().replaceAll('-', '.') }}
        </div>
      </header>
    </template>
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
    <template #actions>
      <FloatingButtonsNew />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useLoadingStore } from '~/store/loading.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

const i18n = useI18n()

const route = useRoute()
const router = useRouter()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const loadingStore = useLoadingStore()

const todayTodos = computed(() =>
  todoStore.todos?.filter((todo) => todo.createdDate === route.params.id)
)

const deleteTodo = (id: number) => {
  if (confirm(i18n.t('ConfirmDelete'))) todoStore.deleteTodo(id)
}
</script>