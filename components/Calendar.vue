<template>
  <div>
    <Calendar
      :locale="storageStore.language"
      expanded
      v-model="date"
      :attributes="attrs"
      style="width: 100%; border: 0"
      :class="storageStore.getThemeClass('', 'dark')">
      <template #day-content="data">
        <NuxtLink
          :to="`${route.path}?calendar=${data.day.id}`"
          :area-label="data.day.id">
          <div
            v-if="!data.day.inNextMonth"
            class="flex flex-col gap-2 | px-0.5 py-2">
            <h3
              class="w-fit | px-1.5 py-.5 mx-auto | rounded-full | text-[12px] md:text-sm"
              :class="
                data.attributes.length
                  ? storageStore.getThemeClass(
                      'bg-slate-800 | text-white',
                      'bg-white text-slate-800'
                    )
                  : storageStore.getThemeClass('', 'text-white')
              ">
              {{ data.day.day }}
            </h3>
            <ul class="flex flex-col gap-.5 | min-h-[40px]">
              <li
                v-for="todo in todoStore.todos
                  ?.filter((todo) => todo.createdDate === data.day.id)
                  .slice(0, slice)"
                :key="todo.id"
                class="flex | w-full overflow-hidden | border rounded-lg | p-0.5 | relative"
                :class="storageStore.getThemeClass('', 'border-slate-700')">
                <span
                  class="truncate-2 text-[8px] md:text-sm"
                  :class="storageStore.getThemeClass('', 'text-white')"
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
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'

withDefaults(
  defineProps<{
    slice: number
  }>(),
  {
    slice: 3,
  }
)

const todoStore = useTodoStore()
const storageStore = useStorageStore()

const route = useRoute()

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
  &.dark {
    background: transparent;

    .vc-weeks {
      .vc-day {
        border-top: 1px solid rgba(51, 65, 85);
      }
    }

    .vc-weekday {
      color: white;
    }

    .vc-title {
      span {
        color: white;
      }
    }

    .vc-base-icon {
      stroke: white;
    }
  }

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
