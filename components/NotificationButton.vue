<template>
  <NuxtLink to="/notification" area-label="Notification">
    <button class="flex | relative" name="Notification">
      <div
        v-if="todoStore.hasUnCheckedTodos"
        class="absolute top-[1px] left-[1px] | aspect-square w-2 | bg-red-500 | rounded-full"></div>
      <i
        class="icon icon-notification | text-2xl"
        :class="storageStore.getThemeClass('', 'text-white')"></i>
    </button>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

const todoStore = useTodoStore()
const storageStore = useStorageStore()
</script>

<style></style>
