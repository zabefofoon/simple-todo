<template>
  <div
    class="flex flex-col gap-2 | w-full min-w-[200px] lg:aspect-square overflow-auto | border rounded-lg | p-4"
    :class="
      storageStore.getThemeClass('bg-white', 'border-slate-700 text-white')
    ">
    <div
      v-if="loadingStore.todoLoading"
      class="w-full aspect-video lg:aspect-square | flex items-center justify-center">
      <Spinner class="m-auto" />
    </div>
    <template v-else>
      <div class="">
        <ul class="flex flex-col gap-2">
          <template v-for="(tagData, index) in tagDatas" :key="index">
            <li class="flex items-start gap-2">
              <NuxtLink
                :to="tagData.totalHref"
                class="flex items-center gap-1.5 | text-lg">
                <div
                  v-if="index !== 0"
                  class="block | w-3 h-3 | rounded-full"
                  :style="{ background: tagData.color ?? 'black' }"></div>
                <span :class="index === 0 ? 'text-lg' : 'text-sm'">
                  <template v-if="index !== 0">#</template>{{ tagData.label }}
                </span>
              </NuxtLink>
              <div class="flex flex-col gap-0.5 | ml-auto | text-xs text-right">
                <NuxtLink :to="tagData.totalHref">
                  {{ i18n.t('All') }} {{ i18n.t('Nth', { n: tagData.total }) }}
                </NuxtLink>
                <NuxtLink :to="tagData.doneHref">
                  {{ i18n.t('Done') }} {{ i18n.t('Nth', { n: tagData.done }) }}
                </NuxtLink>
                <NuxtLink :to="tagData.undoneHref">
                  {{ i18n.t('Undone') }}
                  {{ i18n.t('Nth', { n: tagData.undone }) }}
                </NuxtLink>
              </div>
            </li>
            <hr
              v-if="index !== tagDatas.length - 1"
              :class="
                storageStore.getThemeClass('bg-white', 'border-slate-700')
              " />
          </template>
        </ul>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const i18n = useI18n()
const localePath = useLocalePath()

const todoStore = useTodoStore()
const settingStore = useSettingStore()
const loadingStore = useLoadingStore()
const storageStore = useStorageStore()

interface TagData {
  id?: string
  color?: string
  label: string
  total: number
  done: number
  undone: number
  totalHref: string
  doneHref: string
  undoneHref: string
}

const tagDatas = computed(() => {
  const totalLength = todoStore.todos?.length ?? 0
  const done = todoStore.todos?.filter((todo) => todo.done).length ?? 0
  const total: TagData = {
    label: i18n.t('All'),
    total: totalLength,
    done,
    undone: totalLength - done,
    totalHref: localePath({ path: '/todo' }),
    doneHref: localePath({ path: '/todo', query: { filter: 'Done' } }),
    undoneHref: localePath({ path: '/todo', query: { filter: 'Undone' } }),
  }

  return (
    settingStore.setting?.tags
      .reduce<TagData[]>(
        (acc, current) => {
          const total =
            todoStore.todos?.filter(({ tagId }) => tagId === current.id)
              .length ?? 0

          const done =
            todoStore.todos
              ?.filter(({ tagId }) => tagId === current.id)
              .filter((todo) => todo.done).length ?? 0

          acc.push({
            id: current.id,
            color: current.color,
            label: current.label,
            total,
            done,
            undone: total - done,
            totalHref: localePath({
              path: '/',
              query: { tags: current.id },
            }),
            doneHref: localePath({
              path: '/',
              query: { tags: current.id, filter: 'Done' },
            }),
            undoneHref: localePath({
              path: '/',
              query: { tags: current.id, filter: 'Undone' },
            }),
          })
          return acc
        },
        [total]
      )
      .sort((a, b) => b.total - a.total) ?? []
  )
})
</script>
