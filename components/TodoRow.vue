<template>
  <NuxtLink :to="`/todo/${todo.id}`">
    <figure class="w-full h-full | flex gap-2 | border rounded-lg | relative">
      <div v-if="todo.tagId" class="w-20 h-full | flex items-center | border-r">
        <div
          class="w-fit flex-shrink-0 overflow-hidden | whitespace-nowrap text-white text-[10px] lg:text-xs px-1.5 py-.5 mx-auto | rounded-full"
          :style="{
            background: todo.tag?.color || 'black',
          }">
          #{{ todo.tag?.label }}
        </div>
      </div>
      <div v-else class="w-20 h-full | flex items-center | border-r">
        <div
          class="w-fit flex-shrink-0 overflow-hidden | whitespace-nowrap text-[10px] lg:text-xs px-1.5 py-.5 mx-auto | border rounded-full">
          memo
        </div>
      </div>
      <div
        class="w-full overflow-hidden | py-2 | text-ellipsis whitespace-nowrap lg:whitespace-normal">
        <span v-if="(todo.description?.length || 0) > 50">
          {{ todo.description?.slice(0, 50) }}...
        </span>
        <span v-else>
          {{ todo.description }}
        </span>
      </div>
      <figcaption
        v-if="todo.upto"
        class="absolute right-0 top-0 -translate-y-1/2 | flex-shrink-0 w-fit | flex items-center gap-1 | text-[10px] lg:text-xs | bg-white">
        <i class="icon icon-timer"></i>
        <span>
          {{ todo.date?.replaceAll('-', '.').substring(2) }}
          {{ todo.time }}
        </span>
      </figcaption>
      <button
        v-if="!hideDelete"
        class="close-button | flex items-center | p-2"
        @click.stop.prevent="emit('delete', todo.id || -1)">
        <i class="icon icon-close"></i>
      </button>
      <button
        class="flex items-center | absolute top-1/2 -translate-y-1/2 z-10 | rounded-full"
        :class="[
          todo.done ? 'bg-green-500' : 'border border-gray-200',
          hideDelete ? 'right-2' : 'right-8',
        ]"
        @click.stop.prevent="emit('done', todo.id || -1, todo.done)">
        <i
          class="icon icon-check | text-sm"
          :class="todo.done ? 'text-white' : 'text-gray-300'"></i>
      </button>
    </figure>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo'
import { useSettingStore } from '~/store/setting.store'

defineProps<{
  todo: Todo
  hideDelete?: boolean
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'done', id: number, done?: boolean): void
}>()

const settingStore = useSettingStore()
</script>

<style></style>
