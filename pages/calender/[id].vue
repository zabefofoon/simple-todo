<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <header
        class="flex items-center gap-3 | py-2 px-4 | border-b | overflow-hidden">
        <button class="flex" @click="router.back()">
          <i class="icon icon-arrow-left"></i>
        </button>
        <div
          class="w-full | text-lg truncate | cursor-pointer"
          @click="router.back()">
          {{ route.params.id }}
        </div>
      </header>
    </template>

    <div class="w-full h-full">
      <div
        v-if="settingStore.setting?.display === 'thumbnail'"
        class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 | p-4">
        <TodoThumbnail
          v-for="todo in todayTodos"
          :key="todo.id"
          :todo="todo"
          @delete="todoStore.deleteTodo"
          @done="todoStore.doneTodo" />
      </div>
      <div
        v-else
        class="h-full | flex flex-col gap-2 | p-4 | min-h-full"
        :class="{ 'justify-center': !todayTodos?.length }">
        <TodoRow v-for="todo in todayTodos" :key="todo.id" :todo="todo" />
        <p v-if="!todayTodos?.length" class="text-center py-10">
          {{ $t('NoTodo') }}
        </p>
      </div>
    </div>
    <template #actions>
      <ClientOnly>
        <NuxtLink
          :to="`/todo/new?date=${route.params.id}`"
          class="flex | bg-slate-800 rounded-full | p-2">
          <i class="icon icon-add | text-white text-2xl"></i>
        </NuxtLink>
      </ClientOnly>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useTodoStore } from '~/store/todo.store'
import { useSettingStore } from '~/store/setting.store'

const route = useRoute()
const router = useRouter()

const settingStore = useSettingStore()
const todoStore = useTodoStore()

const todayTodos = computed(() =>
  todoStore.todos?.filter((todo) => todo.createdDate === route.params.id)
)
</script>

<style></style>
