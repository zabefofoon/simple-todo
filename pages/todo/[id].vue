<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <header
        class="flex items-center gap-3 | py-2 px-4 | border | overflow-hidden">
        <button class="flex" @click="$router.back()">
          <i class="icon icon-arrow-left"></i>
        </button>
        <div class="w-full | text-lg truncate | cursor-pointer" @click="$router.back()">
          <span v-if="isEditMode">
            {{ description?.slice(0, 20) || 'New' }}
          </span>
          <span v-else>Todo</span>
        </div>
      </header>
    </template>
    <div class="p-4">
      <div class="flex flex-col gap-2">
        <div class="flex lg:gap-2">
          <!-- <h4 class="text-sm">Deadline</h4> -->
          <div class="flex items-center gap-1 | border">
            <input
              class="hidden"
              :checked="upto"
              @change="setUpto"
              id="upTo"
              type="checkbox" />
            <label
              for="upTo"
              class="flex items-center gap-1.5 | p-2 | text-sm | cursor-pointer"
              :class="upto ? 'text-black' : 'text-gray-300'">
              <i class="icon icon-timer"></i>
              <span>Upto</span>
            </label>
          </div>
          <div v-if="upto" class="flex gap-1 lg:gap-2 | ml-auto lg:ml-0">
            <input
              :value="date"
              class="w-fit | border | px-2 py-1 | bg-white | text-sm"
              type="date"
              @change="setDate" />
            <input
              :value="time"
              class="w-fit | border | px-2 py-1 | bg-white | text-sm"
              type="time"
              @change="setTime" />
          </div>
          <button
            class="hidden lg:block | bg-black | text-white rounded-full | px-5 py-1 ml-auto"
            @click="done">
            <span>Save</span>
          </button>
        </div>
        <textarea
          ref="textArea"
          :value="description"
          class="border | h-auto min-h-[300px] max-h-[50vh] resize-none | p-2"
          placeholder="Description"
          @input="resizeTextArea"
          @change="setDescription" />
        <div class="flex flex-wrap items-center gap-2">
          <div
            v-for="(tag, index) in tags"
            :key="index"
            class="flex items-center | border">
            <input
              :value="tag.color"
              class="bg-white | p-0 | w-6 aspect-square"
              type="color"
              @change="setTag(index, 'color', $event)" />
            <input
              :value="tag.label"
              class="bg-white | min-w-[16px] w-16 | py-1 px-2 | text-sm"
              placeholder="Tag"
              @change="setTag(index, 'label', $event)" />
            <button class="flex pr-1" @click="deleteTag(index)">
              <i class="icon icon-close"></i>
            </button>
          </div>
          <button
            class="flex items-center justify-center gap-1 | w-fit | px-2 py-1 | border border-dashed"
            @click="addTag">
            <i class="icon icon-add | text-md"></i>
            <span class="text-sm">Tag</span>
          </button>
        </div>
      </div>
    </div>
    <button
      class="lg:hidden | w-[96vw] | bg-black | text-white rounded-full | py-3 lg:py-2 mx-auto mt-auto mb-4"
      @click="done">
      <span>Done</span>
    </button>
  </NuxtLayout>
</template>

<script setup lang="ts">
import todoApi from '~/api/todo.api';
import { Tag } from '~/models/Tag';
import type { Todo } from '~/models/Todo';

const router = useRouter()
const route = useRoute()

const isEditMode = computed(() => !isNaN(Number(route.params.id)))

const textArea = ref<HTMLTextAreaElement>()

const getToday = () => {
  const today = new Date()

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷팅
  const day = String(today.getDate()).padStart(2, '0') // 날짜를 두 자리로 포맷팅

  return `${year}-${month}-${day}`
}

const resizeTextArea = () => {
  if (!textArea.value) return

  textArea.value.style.height = `0px`
  textArea.value.style.height = `${textArea.value.scrollHeight}px`
}

const upto = ref(false)
const setUpto = (event: Event) => {
  const value = (<HTMLInputElement>event.target).checked
  upto.value = value
}

const date = ref<string | undefined>(getToday()) //2024-01-03
const setDate = (event: Event) => {
  const value = (<HTMLInputElement>event.target).value
  date.value = value
}

const time = ref<string | undefined>('23:59') //12:36
const setTime = (event: Event) => {
  const value = (<HTMLInputElement>event.target).value
  time.value = value
}

const description = ref()
const setDescription = (event: Event) => {
  const value = (<HTMLInputElement>event.target).value
  description.value = value
}

const tags = ref<Tag[]>([])
const addTag = () => tags.value.push(Tag.of({ label: '', color: '' }))

const setTag = (index: number, key: keyof Tag, event: Event) => {
  const value = (<HTMLInputElement>event.target).value
  tags.value[index][key] = value
}

const deleteTag = (index: number) => {
  tags.value.splice(index, 1)
}

const done = async () => {
  const data: Partial<Todo> = {
    description: toValue(description),
    upto: toValue(upto),
  }

  if (!toValue(isEditMode)) data.created = new Date().getTime()

  data.date = toValue(upto) ? toValue(date) : undefined
  data.time = toValue(upto) ? toValue(time) : undefined

  data.tags = toRaw(toValue(tags)).filter((tag) => tag.label)

  toValue(isEditMode)
    ? await todoApi.updateTodo(Number(route.params.id), data)
    : await todoApi.addTodo(<Todo>data)

  router.push('/todo')
}

const loadTodo = async () => {
  const todo = await todoApi.getTodo(Number(route.params.id))
  if (todo) {
    description.value = todo.description
    tags.value = todo.tags || []
    upto.value = todo.upto || false

    if (toValue(upto)) {
      date.value = todo.date
      time.value = todo.time
    }
    setTimeout(() => resizeTextArea())
  }
}

onMounted(() => {
  if (toValue(isEditMode)) loadTodo()
})
</script>

<style></style>
