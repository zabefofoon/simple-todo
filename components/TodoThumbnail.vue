<template>
  <NuxtLink
    :to="`/todo/${todo.id}`"
    v-long-click="() => emit('delete', Number(todo.id))">
    <figure
      class="thumbnail | relative | w-full aspect-square overflow-hidden | p-2 | border rounded-lg">
      <button
        v-if="!hideDelete"
        class="close-button | flex | absolute top-1 right-1"
        @click.stop.prevent="emit('delete', todo.id || -1)">
        <i class="icon icon-close"></i>
      </button>
      <div class="flex gap-1 | absolute bottom-[5px] right-1 z-10">
        <span
          v-if="todo.tag"
          class="text-white text-[10px] lg:text-xs | px-1.5 py-.5 | rounded-full"
          :style="{ background: todo.tag?.color || 'black' }">
          #{{ todo.tag?.label }}
        </span>
      </div>
      <div
        class="text-sm md:text-base | py-3"
        v-html="todo.description?.replaceAll('\n', '<br />')"></div>
      <button
        class="flex items-center | absolute left-1 top-1 z-10 | rounded-full"
        :class="todo.done ? 'bg-green-500' : 'border border-gray-200'"
        @click.stop.prevent="emit('done', todo.id || -1, todo.done)">
        <i
          class="icon icon-check | text-sm"
          :class="todo.done ? 'text-white' : 'text-gray-300'"></i>
      </button>
      <figcaption
        v-if="todo.upto"
        class="w-full | absolute bottom-0 left-0 | border-t | py-1 px-0.5 | flex items-center gap-1 | text-[10px] lg:text-xs | bg-white">
        <i class="icon icon-timer"></i>
        <span>
          {{ todo.date?.replaceAll('-', '.').substring(2) }}
          {{ todo.time }}
        </span>
      </figcaption>
    </figure>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo'

defineProps<{
  todo: Todo
  hideDelete?: boolean
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'done', id: number, done?: boolean): void
}>()

const test = (event: Event) => {
  console.log(event)
}
</script>
