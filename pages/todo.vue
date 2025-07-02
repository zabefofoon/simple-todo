<template>
  <div class="flex flex-col | h-full">
    <div
      class="sticky top-0 z-20 | flex items-center gap-1 | px-4 py-2 | border-b border-theme | bg-theme-3">
      <SearchInputButton />
      <DarkModeButton class="hidden lg:flex" />
      <NotificationButton class="hidden lg:block" />
      <template v-if="loadingStore.todoLoading">
        <Skeletor class="w-[80px] h-[24px] | ml-auto" />
        <Skeletor class="w-[80px] h-[24px]" />
      </template>
      <template v-else>
        <TodoTagSelector class="ml-auto" />
        <TodoStatusSelector class="lg:ml-2" />
      </template>
    </div>
    <div v-if="!todos?.length" class="flex | h-full">
      <Spinner v-if="loadingStore.todoLoading" class="m-auto" />
      <p
        v-else
        class="w-full | flex items-center justify-center | text-center text-theme"
        v-t="'NoTodo'"></p>
    </div>
    <template v-else>
      <div class="p-2 lg:p-5 | xl:grid xl:grid-cols-2 lg:gap-x-4">
        <template v-for="tag in settingStore.setting?.tags" :key="tag.id">
          <div
            v-if="todosByTag[tag.id]?.length"
            class="mb-4 lg:mb-5 | rounded-lg border border-theme">
            <div
              class="p-2 lg:p-4 | font-bold text-theme | flex items-center gap-1.5">
              <NuxtLinkLocale
                class="flex items-center gap-1.5"
                :to="`${route.path}?tags=${tag.id}`">
                #{{ tag.label }}
                <i class="icon icon-arrow-right | text-xs | mt-0.5"></i>
              </NuxtLinkLocale>
            </div>
            <div class="flex flex-col gap-3 | p-2 lg:p-4 | h-auto">
              <TodoRow
                v-for="todo in todosByTag[tag.id]"
                :key="todo.id"
                :todo="todo"
                :route-query="route.query"
                :route-path="route.path" />
            </div>
          </div>
        </template>
        <div
          v-if="todosByTag.memo?.length"
          class="mb-4 lg:mb-8 | rounded-lg border border-theme">
          <div
            v-if="!route.query.tag"
            class="p-2 lg:p-4 | font-bold text-theme | flex items-center gap-1.5">
            <NuxtLinkLocale
              class="flex items-center gap-1.5"
              :to="`${route.path}?tags=memo`">
              #memo
              <i class="icon icon-arrow-right | text-xs | mt-0.5"></i>
            </NuxtLinkLocale>
          </div>
          <div class="flex flex-col gap-2 | p-2 lg:p-4 | h-auto">
            <TodoRow
              v-for="todo in todosByTag.memo"
              :key="todo.id"
              :todo="todo"
              :route-query="route.query"
              :route-path="route.path" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '~/models/Todo'

definePageMeta({
  layout: 'layout-basic',
  buttons: ['new', 'search'],
})

const route = useRoute()

const todoStore = useTodoStore()
const loadingStore = useLoadingStore()
const settingStore = useSettingStore()

const todos = computed(() => {
  let result: Todo[] | undefined = undefined
  if (route.query.filter === 'Undone')
    result = todoStore.todos?.filter((todo) => !todo.done)
  else if (route.query.filter === 'Done')
    result = todoStore.todos?.filter((todo) => todo.done)
  else result = todoStore.todos

  return route.query.tag
    ? result
        ?.filter(
          (todo) =>
            todo.tagId === route.query.tag ||
            (!todo.tag && route.query.tag === 'memo')
        )
        .sort((a, b) => b.created! - a.created!)
    : result?.sort((a, b) => b.created! - a.created!)
})

const todosByTag = computed(() => {
  const map: Record<string, Todo[]> = {}

  todos.value.forEach((todo) => {
    const key = todo.tagId ?? 'memo'
    const arr = (map[key] ||= [])
    arr.push(todo)
  })

  return map
})

useHead(() => ({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
}))
</script>
