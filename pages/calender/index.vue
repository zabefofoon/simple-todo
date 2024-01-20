<template>
  <NuxtLayout name="layout-basic">
    <div
      class="sticky top-0 z-10 | hidden lg:flex items-center gap-1 | bg-white | px-4 py-2 | border-b">
      <NuxtLink class="w-full max-w-[50%] | relative" to="/search">
        <input
          class="w-full | px-3 py-1 | bg-slate-200 | rounded-full | text-sm"
          :placeholder="$t('Search')" />
        <i
          class="icon icon-search | text-xl | absolute right-1 top-1/2 -translate-y-1/2"></i>
      </NuxtLink>
      <NotificationButton />
    </div>
    <div class="h-full | lg:px-4">
      <ClientOnly>
        <Calendar
          expanded
          v-model="date"
          :attributes="attrs"
          style="width: 100%; border: 0">
          <template #day-content="data">
            <NuxtLink :to="`/calender/${data.day.id}`">
              <div
                v-if="!data.day.inNextMonth"
                class="flex flex-col gap-2 | px-0.5 py-2">
                <h3
                  class="w-fit | px-1.5 py-.5 mx-auto | rounded-full | text-[12px] md:text-sm"
                  :class="
                    data.attributes.length ? 'bg-slate-800 | text-white' : ''
                  ">
                  {{ data.day.day }}
                </h3>
                <ul class="flex flex-col gap-.5 | min-h-[40px]">
                  <li
                    v-for="todo in todoStore.todos
                      ?.filter((todo) => todo.createdDate === data.day.id)
                      .slice(0, 3)"
                    :key="todo.id"
                    class="flex | w-full overflow-hidden | border">
                    <span
                      class="truncate-2 text-[8px] md:text-sm"
                      v-html="todo.description?.replaceAll('\n', '<br/>')">
                    </span>
                  </li>
                </ul>
              </div>
            </NuxtLink>
          </template>
        </Calendar>
      </ClientOnly>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Calendar } from 'v-calendar'
import { useTodoStore } from '~/store/todo.store'

const todoStore = useTodoStore()

const date = ref(new Date())
const attrs = ref([
  {
    key: 'today',
    dates: new Date(),
  },
])
</script>

<style scoped lang="scss">
::v-deep(.vc-container) {
  .vc-weeks {
    margin-top: 20px;
    .vc-day {
      width: 100%;
      overflow: hidden;
      border-top: 1px solid #f3f3f3;

      &.is-not-in-month {
        border: 0;
      }
    }
  }
}
</style>
