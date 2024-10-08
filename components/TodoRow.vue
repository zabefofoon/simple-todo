<template>
  <NuxtLink
    ref="nuxtLinkEl"
    :to="route.query.bulk ? undefined : url"
    :area-label="`Todo ${todo.id}`"
    @mousedown="route.query.bulk && bulkStore.add(todo.id)"
    @contextmenu.prevent>
    <figure
      class="w-full h-full | flex items-center gap-1 | border rounded-lg | relative | py-1"
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
      <div
        v-if="todo.tag?.id"
        class="w-20 h-full | flex items-center | border-r"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
        <NuxtLink
          :to="`/?tags=${todo.tag.id}`"
          class="w-fit flex-shrink-0 overflow-hidden | whitespace-nowrap text-white text-[10px] lg:text-xs px-1.5 py-.5 mx-auto | rounded-full"
          :style="{
            background: todo.tag?.color || 'black',
          }">
          #{{ todo.tag?.label }}
        </NuxtLink>
      </div>
      <div
        v-else
        class="w-20 h-full | flex items-center | border-r"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
        <div
          class="w-fit flex-shrink-0 overflow-hidden | whitespace-nowrap text-[10px] lg:text-xs px-1.5 py-.5 mx-auto | border rounded-full"
          :class="storageStore.getThemeClass('', 'text-white')">
          memo
        </div>
      </div>
      <div
        class="w-full overflow-hidden | py-2 | text-ellipsis whitespace-nowrap lg:whitespace-normal">
        <span
          v-if="(todo.description?.length || 0) > 30"
          :class="storageStore.getThemeClass('', 'text-white')">
          {{ todo.description?.slice(0, 30) }}...
        </span>
        <span v-else :class="storageStore.getThemeClass('', 'text-white')">
          {{ todo.description }}
        </span>
      </div>
      <figcaption
        v-if="leftUptoMinits > 0"
        class="absolute right-0 top-0 -translate-y-1/2 | flex-shrink-0 w-fit | flex items-center gap-1 | text-[10px] lg:text-xs"
        :class="storageStore.getThemeClass('bg-white', 'bg-slate-900')">
        <i
          class="icon icon-timer"
          :class="storageStore.getThemeClass('', 'text-white')"></i>
        <span :class="storageStore.getThemeClass('', 'text-white')">
          <template v-if="leftUptoHours > 0">
            {{ i18n.t('LeftHours', [leftUptoHours]) }}
          </template>
          <template v-else>
            {{ i18n.t('LeftMinits', [leftUptoMinits]) }}
          </template>
        </span>
      </figcaption>
      <img
        v-if="todo.linked"
        class="w-3 | mr-2"
        src="~/assets/images/google.svg" />
      <button
        name="Check"
        class="flex items-center | rounded-full"
        :class="[
          todo.done ? 'bg-green-500' : 'border border-gray-200',
          hideDelete ? 'right-2' : 'right-8',
        ]"
        @click.stop.prevent="
          !route.query.builk && emit('done', todo.id || '', todo.done)
        ">
        <i
          class="icon icon-check | text-sm"
          :class="todo.done ? 'text-white' : 'text-gray-300'"></i>
      </button>
      <button
        v-if="!hideDelete"
        nmae="Delete"
        class="flex items-center | p-1"
        @click.stop.prevent="
          !route.query.builk && emit('delete', todo.id || '')
        ">
        <i
          class="icon icon-close"
          :class="storageStore.getThemeClass('', 'text-white')"></i>
      </button>
      <span
        class="absolute left-0 top-0 -translate-y-1/2 | text-[10px] lg:text-xs"
        :class="
          storageStore.getThemeClass('bg-white', 'bg-slate-900 text-white')
        ">
        {{ todo.createdDate.replaceAll('-', '.').slice(2) }}
      </span>
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
  (e: 'delete', id: string): void
  (e: 'done', id: string, done?: boolean): void
}>()

const route = useRoute()

const storageStore = useStorageStore()
const bulkStore = useBulkStore()
const i18n = useI18n()

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

const url = computed(() => {
  const query = routerUtil.queryToString(route.query)
  const path = route.path
  return !query
    ? `${path}?todo=${props.todo.id}`
    : `${path}?${query}&todo=${props.todo.id}`
})

onMounted(() => {
  getLeftUptoHours(props.todo)
  getLeftUptoMinits(props.todo)
})

const nuxtLinkEl = ref<HTMLAnchorElement>()
onLongPress(nuxtLinkEl, () => bulkStore.turnOnBulkMode(props.todo.id), {
  delay: 300,
  modifiers: {
    prevent: true,
  },
})
</script>
