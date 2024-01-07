<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <header class="flex items-center gap-3 | py-2 px-4 | border">
        <button class="flex" @click="$router.back()">
          <i class="icon icon-arrow-left"></i>
        </button>
        <div class="text-lg" @click="$router.back()">Header</div>
      </header>
    </template>
    <div class="p-4">
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <input
            :value="date"
            class="border | px-2 py-1 | bg-white"
            type="date"
            @change="setDate" />
          <input
            :value="time"
            class="border | px-2 py-1 | bg-white"
            type="time"
            @change="setTime" />
        </div>
        <input
          :value="title"
          class="border | p-2"
          placeholder="Title"
          @change="setTitle" />
        <textarea
          :value="description"
          class="border | h-auto min-h-[500px] resize-none | p-2"
          placeholder="Description"
          @input="resizeTextArea"
          @change="setDescription"></textarea>
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
              class="bg-white | min-w-[16px] w-16 | py-1 px-2"
              placeholder="Tag"
              @change="setTag(index, 'label', $event)" />
          </div>
          <button
            class="flex items-center justify-center gap-1 | w-fit | px-2 py-1 | border border-dashed"
            @click="addTag">
            <i class="icon icon-add | text-xl"></i>
            <span>Tag</span>
          </button>
        </div>
        <button
          class="flex items-center justify-center gap-1 | bg-black | text-white | py-2 mt-auto"
          @click="addTodo">
          <span>Add</span>
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Tag } from '~/models/Tag';

const getToday = () => {
  const today = new Date()

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷팅
  const day = String(today.getDate()).padStart(2, '0') // 날짜를 두 자리로 포맷팅

  return `${year}-${month}-${day}`
}

const resizeTextArea = (event: Event) => {
  const el = <HTMLTextAreaElement>event.target
  el.style.height = `0px`
  el.style.height = `${el.scrollHeight}px`
}

const date = ref(getToday()) //2024-01-03
const setDate = (event: Event) => {
  const value = (<HTMLInputElement>event.target).value
  date.value = value
}

const time = ref('23:59') //12:36
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

const addTodo = () => {
  const data = {
    date: toValue(date),
    time: toValue(time),
    title: toValue(title),
    description: toValue(description),
    tags: toRaw(toValue(tags)),
  }

  console.log(data)
}
</script>

<style></style>
