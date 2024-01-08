<template>
  <NuxtLink :to="`/todo/${todo.id}`">
    <figure
      class="relative | w-full aspect-square overflow-hidden | p-2 | border">
      <div class="truncate-4 | text-lg">
        {{ todo.title }}
      </div>
      <figcaption
        class="w-full | absolute bottom-0 left-0 | p-1 | text-xs | border | bg-white">
        {{ todo.date }}
        {{ todo.time }}
      </figcaption>
    </figure>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo';

defineProps<{
    todo: Todo
}>()
</script>

<style></style>
