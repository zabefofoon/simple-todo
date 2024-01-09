<template>
  <NuxtLink :to="`/todo/${todo.id}`">
    <figure
      class="thumbnail | relative | w-full aspect-square overflow-hidden | p-2 | border">
      <button
        class="close-button | flex | absolute top-1 right-1"
        @click.stop.prevent="emit('delete', todo.id || -1)">
        <i class="icon icon-close"></i>
      </button>
      <div
        class="flex gap-1 | absolute right-2"
        :class="todo.upto ? 'bottom-8' : 'bottom-2'">
        <span
          v-for="(tag, index) in todo.tags"
          :key="index"
          class="text-white text-xs | px-1.5 py-.5 | rounded-full"
          :style="{ background: tag.color || 'black' }">
          #{{ tag.label }}
        </span>
      </div>
      <div class="text-md | py-3">
        {{ todo.description }}
      </div>
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
        class="w-full | absolute bottom-0 left-0 | border | p-1 | flex items-center gap-1 | text-xs | bg-white">
        <i class="icon icon-timer"></i>
        <span>{{ todo.date }} {{ todo.time }}</span>
      </figcaption>
    </figure>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo'

defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'done', id: number, done?: boolean): void
}>()
</script>
