<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <header class="flex items-center gap-3 | py-2 px-4 | border">
        <button class="flex" @click="$router.back()">
          <i class="icon icon-arrow-left"></i>
        </button>
        <div class="text-lg" @click="$router.back()">
          <span v-if="isEditMode">{{ title }}</span>
          <span v-else>Todo</span>
        </div>
      </header>
    </template>
    <div class="p-4">
      <div class="flex flex-col gap-2">
        <div class="flex lg:gap-2">
          <!-- <h4 class="text-sm">Deadline</h4> -->
          <div class="flex items-center gap-1 | px-2 py-1 | border">
            <input
              :checked="upto"
              @change="setUpto"
              id="upTo"
              type="checkbox" />
            <label for="upTo" class="text-sm">Upto</label>
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
        </div>
        <input
          :value="title"
          class="border | p-2"
          placeholder="Title"
          @change="setTitle" />
        <textarea
          ref="textArea"
          :value="description"
          class="border | h-auto min-h-[100px] max-h-[50vh] resize-none | p-2"
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
      class="w-full | bg-black | text-white | py-3 mt-auto lg:mt-0"
      @click="done">
      <span>Done</span>
    </button>
  </NuxtLayout>
</template>

<script setup lang="ts">
import todoApi from '~/api/todo.api'
import { Tag } from '~/models/Tag'
import type { Todo } from '~/models/Todo'

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

const title = ref()
const setTitle = (event: Event) => {
  const value = (<HTMLInputElement>event.target).value
  title.value = value
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

const done = async () => {
  const data: Todo = {
    title: toValue(title),
    description: toValue(description),
    tags: toRaw(toValue(tags)),
    upto: toValue(upto),
  }

  if (!toValue(isEditMode)) data.created = new Date().getTime()

  data.date = toValue(upto) ? toValue(date) : undefined
  data.time = toValue(upto) ? toValue(time) : undefined

  toValue(isEditMode)
    ? await todoApi.updateTodo(Number(route.params.id), data)
    : await todoApi.addTodo(data)

  router.push('/todo')
}

const loadTodo = async () => {
  const todo = await todoApi.getTodo(Number(route.params.id))
  if (todo) {
    title.value = todo.title
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
