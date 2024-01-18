<template>
  <div
    class="flex flex-col gap-2 | flex-shrink-0 | lg:min-w-[300px] lg:w-[25vw] | p-2 lg:p-3 | border">
    <div class="font-bold">Calender</div>
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
                :class="data.attributes.length ? 'bg-black | text-white' : ''">
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
