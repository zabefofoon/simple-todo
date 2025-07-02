<template>
  <div
    ref="nuxtLinkEl"
    :area-label="`Todo ${todo.id}`"
    class="text-theme cursor-pointer"
    @click="routeQuery.bulk ? bulkStore.add(todo.id) : navigateTo(url)"
    @contextmenu.prevent>
    <figure
      class="border-l-8 | w-full h-full overflow-hidden | flex items-center gap-1 | border rounded-lg | relative | px-4 py-3"
      :style="{ borderLeft: `8px solid ${tag?.color}` }"
      :class="[
        bulkStore.selectedTodoIds.includes(todo.id)
          ? 'border-orange-500'
          : 'dark:border-slate-700',
      ]">
      <div class="w-full">
        <div class="flex items-center | -ml-0.5 mb-0.5">
          <div
            v-if="tag"
            :to="`/?tags=${tag.id}`"
            class="text-white text-[10px] lg:text-xs px-1.5 py-.5 | rounded-full"
            :style="{
              background: tag?.color || 'black',
            }"
            @click="navigateTo(tagUrl)">
            #{{ tag?.label }}
          </div>
          <span
            v-else
            class="text-[10px] lg:text-xs px-1.5 py-.5 | border rounded-full">
            #memo
          </span>

          <button
            name="Check"
            class="ml-auto | flex items-center | rounded-full"
            :class="[
              todo.done ? 'bg-green-500' : 'border border-gray-200',
              hideDelete ? 'right-2' : 'right-8',
            ]"
            @click.stop.prevent="!routeQuery.bulk && done()">
            <i
              class="icon icon-check | text-sm"
              :class="todo.done ? 'text-white' : 'text-gray-300'"></i>
          </button>
          <button
            v-if="!hideDelete"
            nmae="Delete"
            class="flex items-center | p-1"
            @click.stop.prevent="!routeQuery.bulk && deleteTodo()">
            <i class="icon icon-close"></i>
          </button>
        </div>
        <h4 class="truncate | mb-2 | font-bold dark:font-normal">
          <span v-if="(todo.description?.length || 0) > 30">
            {{ todo.description?.slice(0, 30) }}...
          </span>
          <span v-else>
            {{ todo.description }}
          </span>
        </h4>
        <p class="w-full truncate-2 text-xs | mb-3 | opacity-80">
          {{ todo.description?.slice(0, 300) }}
        </p>
        <div class="flex items-center | w-full">
          <img
            v-if="todo.linked"
            class="w-3 | mr-1"
            src="~/assets/images/google.svg" />
          <p class="text-xs opacity-80">
            {{ etcUtil.formatDate(todo.createdDate, storageStore.language) }}
          </p>
          <figcaption
            v-if="todo.leftUptoMinute > 0"
            class="ml-auto | w-fit | bg-theme | flex items-center gap-1 | opacity-80">
            <i class="icon icon-timer"></i>
            <span
              v-if="todo.leftUptoHour > 0"
              class="text-[10px] lg:text-xs"
              v-t="{ path: 'LeftHours', args: { hour: todo.leftUptoHour } }">
            </span>
            <span
              v-else
              class="text-[10px] lg:text-xs"
              v-t="{
                path: 'LeftMinits',
                args: { minute: todo.leftUptoMinute },
              }">
            </span>
          </figcaption>
        </div>
      </div>
    </figure>
  </div>
</template>

<script setup lang="ts">
import type { LocationQuery } from 'vue-router'
import type { Todo } from '~/models/Todo'
import etcUtil from '~/utils/etc'

const props = defineProps<{
  todo: Todo
  hideDelete?: boolean
  routeQuery: LocationQuery
  routePath: string
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
}>()

const todoStore = useTodoStore()
const googleStore = useGoogleStore()
const storageStore = useStorageStore()
const bulkStore = useBulkStore()
const i18n = useI18n()

const url = computed(() => {
  const query = routerUtil.queryToString(props.routeQuery)
  const path = props.routePath
  return !query
    ? `${path}?todo=${props.todo.id}`
    : `${path}?${query}&todo=${props.todo.id}`
})

const tagUrl = computed(() => {
  return `${props.routePath}/?tags=${props.todo.tagId}`
})

const tag = computed(() => props.todo.tag)

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
