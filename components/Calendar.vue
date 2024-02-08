<template>
  <div
    class="flex flex-col gap-2 | flex-shrink-0 | lg:min-w-[300px] lg:w-[25vw] | p-2 lg:p-3 | border rounded-lg">
    <div class="font-bold">
      <NuxtLink to="calender">{{ $t('Calender') }}</NuxtLink>
    </div>
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
                class="flex | w-full overflow-hidden | border rounded-lg | p-0.5 | relative">
                <span
                  class="truncate-2 text-[8px] md:text-sm"
                  v-html="todo.description?.replaceAll('\n', '<br/>')">
                </span>
                <div
                  class="w-1 h-1 | absolute top-[.5px] left-[.5px] | rounded-full"
                  :style="{
                    background: todo.tag?.color,
                  }"></div>
              </li>
            </ul>
          </div>
        </NuxtLink>
      </template>
    </Calendar>
  </div>
</template>

<script setup lang="ts">
import { Calendar } from 'v-calendar'
import { useTodoStore } from '~/store/todo.store'
import { useSettingStore } from '~/store/setting.store'

const settingStore = useSettingStore()
const todoStore = useTodoStore()

const date = ref(new Date())
const attrs = ref<any>([
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
