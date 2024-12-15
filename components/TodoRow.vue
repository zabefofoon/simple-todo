<template>
  <NuxtLinkLocale
    ref="nuxtLinkEl"
    :key="`${bulkStore.selectedTodoIds.includes(todo.id)}`"
    :to="route.query.bulk ? undefined : url"
    :area-label="`Todo ${todo.id}`"
    class="text-theme"
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
        class="w-20 h-full | flex items-center | border-r border-theme">
        <NuxtLinkLocale
          :to="`/?tags=${todo.tag.id}`"
          class="w-fit flex-shrink-0 overflow-hidden | whitespace-nowrap text-white text-[10px] lg:text-xs px-1.5 py-.5 mx-auto | rounded-full"
          :style="{
            background: todo.tag?.color || 'black',
          }">
          #{{ todo.tag?.label }}
        </NuxtLinkLocale>
      </div>
      <div
        v-else
        class="w-20 h-full | flex items-center | border-r border-theme">
        <div
          class="w-fit flex-shrink-0 overflow-hidden | whitespace-nowrap text-[10px] lg:text-xs px-1.5 py-.5 mx-auto | border rounded-full">
          memo
        </div>
      </div>
      <div
        class="w-full overflow-hidden | pl-0.5 py-2 | text-sm lg:text-md text-ellipsis whitespace-nowrap lg:whitespace-normal">
        <span v-if="(todo.description?.length || 0) > 30">
          {{ todo.description?.slice(0, 30) }}...
        </span>
        <span v-else>
          {{ todo.description }}
        </span>
      </div>
      <figcaption
        v-if="todo.leftUptoMinute > 0"
        class="absolute right-0 top-0 -translate-y-1/2 | flex-shrink-0 w-fit | bg-theme | flex items-center gap-1 | text-[10px] lg:text-xs">
        <i class="icon icon-timer"></i>
        <span
          v-if="todo.leftUptoHour > 0"
          v-t="{ path: 'LeftHours', args: { hour: todo.leftUptoHour } }">
        </span>
        <span
          v-else
          v-t="{ path: 'LeftMinits', args: { minute: todo.leftUptoMinute } }">
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
        @click.stop.prevent="!route.query.bulk && done()">
        <i
          class="icon icon-check | text-sm"
          :class="todo.done ? 'text-white' : 'text-gray-300'"></i>
      </button>
      <button
        v-if="!hideDelete"
        nmae="Delete"
        class="flex items-center | p-1"
        @click.stop.prevent="!route.query.bulk && deleteTodo()">
        <i class="icon icon-close"></i>
      </button>
      <span
        class="absolute left-0 top-0 -translate-y-1/2 | bg-theme-3 | text-[10px] lg:text-xs">
        {{
          etcUtil.formatDate(
            new Date(todo.createdDate).getTime(),
            storageStore.language
          )
        }}
      </span>
    </figure>
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo'
import etcUtil from '~/utils/etc'

const props = defineProps<{
  todo: Todo
  hideDelete?: boolean
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
}>()

const route = useRoute()

const todoStore = useTodoStore()
const googleStore = useGoogleStore()
const storageStore = useStorageStore()
const bulkStore = useBulkStore()
const i18n = useI18n()

const url = computed(() => {
  const query = routerUtil.queryToString(route.query)
  const path = route.path
  return !query
    ? `${path}?todo=${props.todo.id}`
    : `${path}?${query}&todo=${props.todo.id}`
})

const nuxtLinkEl = ref<HTMLAnchorElement>()
onLongPress(nuxtLinkEl, () => bulkStore.turnOnBulkMode(props.todo.id), {
  delay: 300,
  modifiers: {
    prevent: true,
  },
})

const done = () => {
  props.todo.toggleDone()
  props.todo.linked
    ? googleStore.doneTodo2([props.todo], !!props.todo.done)
    : todoStore.doneTodo(props.todo.id ?? '', !props.todo.done)
}

const deleteTodo = () => {
  if (confirm(i18n.t('ConfirmDelete')))
    props.todo.linked
      ? googleStore.deleteTodo2([props.todo])
      : todoStore.deleteTodo(props.todo.id ?? '')
}
</script>
