<template>
  <NuxtLayout name="layout-basic">
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
                    data.attributes.length ? 'bg-black | text-white' : ''
                  ">
                  {{ data.day.day }}
                </h3>
                <ul class="flex flex-col gap-.5 | min-h-[40px]">
                  <li
                    v-for="todo in todos
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
import todoApi from '~/api/todo.api'
import { Todo } from '~/models/Todo'

const date = ref(new Date())
const attrs = ref([
  {
    key: 'today',
    dates: new Date(),
  },
])

const log = console.log

const todos = ref<Todo[]>()
const getAllTodos = async () => {
  const data = await todoApi.getAllTodos()
  todos.value = Todo.map(data).sort(
    (a, b) => Number(b.created) - Number(a.created)
  )
  await Notification.requestPermission()
  navigator.serviceWorker.controller?.postMessage({
    type: 'registerTimer',
    todos: data.filter((todo) => todo.upto),
  })
}

onMounted(() => {
  getAllTodos()
})
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
