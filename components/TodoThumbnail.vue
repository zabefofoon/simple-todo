<template>
  <NuxtLink
    :to="`/todo/${todo.id}`"
    :area-label="`Todo ${todo.id}`"
    v-long-click="() => bulkStore.turnOnBulkMode(todo.id)"
    @click="route.query.bulk && bulkStore.add(todo.id)"
    @contextmenu.prevent>
    <figure
      class="thumbnail | relative | w-full aspect-square overflow-hidden | p-2 | border rounded-lg"
      :class="[
        storageStore.getThemeClass(
          bulkStore.selectedTodoIds.includes(todo.id)
            ? 'border-orange-500'
            : '',
          bulkStore.selectedTodoIds.includes(todo.id)
            ? 'border-orange-500'
            : 'border-slate-700'
        ),
      ]">
      <div class="flex gap-1 | absolute bottom-[5px] right-1 z-10">
        <span
          v-if="todo.tag"
          class="text-white text-[10px] lg:text-xs | px-1.5 py-.5 | rounded-full"
          :style="{ background: todo.tag?.color || 'black' }">
          #{{ todo.tag?.label }}
        </span>
      </div>
      <div
        class="text-sm md:text-base | py-4"
        :class="storageStore.getThemeClass('', 'text-white')"
        v-html="todo.description?.replaceAll('\n', '<br />')"></div>
      <button
        name="Check"
        class="flex items-center | absolute left-1 top-1 z-10 | rounded-full"
        :class="[todo.done ? 'bg-green-500' : 'border border-gray-200']"
        @click.stop.prevent="emit('done', todo.id || -1, todo.done)">
        <i
          class="icon icon-check | text-sm"
          :class="todo.done ? 'text-white' : 'text-gray-300'"></i>
      </button>
      <span
        class="absolute top-1 left-1/2 -translate-x-1/2 text-xs"
        :class="storageStore.getThemeClass('', 'text-white')">
        {{ todo.createdDate.replaceAll('-', '.').slice(2) }}
      </span>
      <button
        v-if="!hideDelete"
        name="Delete"
        class="close-button | flex | absolute top-1 right-1"
        @click.stop.prevent="emit('delete', todo.id || -1)">
        <i
          class="icon icon-close"
          :class="storageStore.getThemeClass('', 'text-white')"></i>
      </button>
      <figcaption
        v-if="leftUptoMinits > 0"
        class="w-full | absolute bottom-0 left-0 | border-t | py-1 px-0.5 | flex items-center gap-1 | text-[10px] lg:text-xs"
        :class="
          storageStore.getThemeClass(
            'bg-white',
            'bg-slate-900 border-slate-700'
          )
        ">
        <i
          class="icon icon-timer"
          :class="storageStore.getThemeClass('', 'text-white')"></i>
        <span :class="storageStore.getThemeClass('', 'text-white')">
          <template v-if="leftUptoHours > 0">
            {{ $t('LeftHours', [leftUptoHours]) }}
          </template>
          <template v-else>
            {{ $t('LeftMinits', [leftUptoMinits]) }}
          </template>
        </span>
      </figcaption>
    </figure>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo'
import { useBulkStore } from '~/store/bulk.store'
import { useStorageStore } from '~/store/storage.store'

const props = defineProps<{
  todo: Todo
  hideDelete?: boolean
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'done', id: number, done?: boolean): void
  (e: 'long-click', id: number): void
}>()

const route = useRoute()

const storageStore = useStorageStore()
const bulkStore = useBulkStore()

const leftUptoHours = ref(0)
const getLeftUptoHours = (todo: Todo) => {
  const targetTime = new Date(`${todo.date!} ${todo.time}`).getTime()
  const currentTime = new Date().getTime()
  const timeDiff = targetTime - currentTime
  leftUptoHours.value = Math.round(timeDiff / (1000 * 60 * 60))
  return Math.round(timeDiff / (1000 * 60 * 60))
}

const leftUptoMinits = ref(0)
const getLeftUptoMinits = (todo: Todo) => {
  const targetTime = new Date(`${todo.date!} ${todo.time}`).getTime()
  const currentTime = new Date().getTime()
  const timeDiff = targetTime - currentTime
  leftUptoMinits.value = Math.round(timeDiff / (1000 * 60))
  return Math.round(timeDiff / (1000 * 60))
}

onMounted(() => {
  getLeftUptoHours(props.todo)
  getLeftUptoMinits(props.todo)
})
</script>
