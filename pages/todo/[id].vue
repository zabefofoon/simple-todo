<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <header
        class="flex items-center gap-3 | py-2 px-4 | border-b | overflow-hidden">
        <button class="flex" @click="$router.back()">
          <i class="icon icon-arrow-left"></i>
        </button>
        <div
          class="w-full | text-lg truncate | cursor-pointer"
          @click="$router.back()">
          <span v-if="isEditMode">
            {{ description || $t('Todo') }}
          </span>
          <span v-else>{{ $t('Todo') }}</span>
        </div>
      </header>
    </template>
    <div class="p-4">
      <div class="flex flex-col gap-6">
        <textarea
          ref="textArea"
          :value="description"
          class="border rounded-lg | h-auto min-h-[60vh] max-h-[60vh] resize-none | p-2"
          placeholder="Description"
          @input="resizeTextArea"
          @change="setDescription" />
        <div class="flex flex-col lg:flex-row gap-2 lg:items-center">
          <div class="flex gap-2 flex-col lg:flex-row lg:items-center | w-full">
            <ClientOnly>
              <div class="flex gap-2">
                <div class="w-full | relative">
                  <label
                    class="absolute top-0 left-0 -translate-y-1/2 | text-[9px] | rounted-full bg-white">
                    {{ $t('Form') }}
                  </label>
                  <select
                    class="w-full lg:w-fit | text-sm | px-2 py-1 | border rounded-lg | bg-white"
                    @change="changeForm">
                    <option value="None">{{ $t('None') }}</option>
                    <option
                      v-for="form in settingStore.setting?.forms"
                      :key="form.id"
                      :value="form.id">
                      {{ form.title }}
                    </option>
                  </select>
                </div>
                <div class="w-full | relative">
                  <label
                    class="flex items-center gap-0.5 | absolute top-0 left-0 -translate-y-1/2 | text-[9px] | rounted-full bg-white">
                    <div
                      v-if="tagId"
                      class="w-2 h-2"
                      :style="{
                        background: settingStore.setting?.tags.find(
                          (tag) => tag.id === tagId
                        )?.color,
                      }"></div>
                    <span>{{ $t('Tag') }}</span>
                  </label>
                  <select
                    class="w-full lg:w-fit | text-sm | px-2 py-1 | border rounded-lg | bg-white"
                    :value="tagId"
                    @change="setTag">
                    <option :value="''">{{ $t('None') }}</option>
                    <option class="hidden" :value="'undefined'">
                      {{ $t('None') }}
                    </option>
                    <option
                      v-for="tag in settingStore.setting?.tags"
                      :key="tag.id"
                      :value="tag.id">
                      {{ tag.label }}
                    </option>
                  </select>
                </div>
              </div>
            </ClientOnly>
            <span class="hidden lg:block opacity-30">|</span>
            <div class="flex items-center gap-1">
              <input
                class="hidden"
                :checked="upto"
                @change="setUpto"
                id="upTo"
                type="checkbox" />
              <label
                for="upTo"
                class="flex items-center gap-1.5 | px-2 py-3 pr-3 lg:py-2.5 | text-xs | border rounded-lg | cursor-pointer"
                :style="{ opacity: upto ? '1' : '.4' }">
                <i class="icon icon-timer"></i>
                <span>{{ $t('Upto') }}</span>
              </label>
              <div
                v-if="upto"
                class="flex gap-1 lg:gap-2 | ml-auto lg:ml-0"
                :style="{ opacity: upto ? '1' : '.4' }">
                <input
                  :value="date"
                  class="w-fit | border rounded-lg | p-2 | bg-white | text-xs"
                  type="date"
                  @change="setDate" />
                <input
                  :value="time"
                  class="w-fit | border rounded-lg | px-2 py-1 | bg-white | text-xs"
                  type="time"
                  @change="setTime" />
              </div>
            </div>
          </div>
          <button
            class="hidden lg:block | bg-slate-800 | text-white rounded-full | px-5 py-1 ml-auto"
            @click="save">
            <span class="text-white whitespace-nowrap">{{ $t('Save') }}</span>
          </button>
        </div>
      </div>
    </div>
    <button
      class="lg:hidden | w-[96vw] | bg-slate-800 | text-white rounded-full | py-3 lg:py-2 mx-auto mt-auto mb-4"
      @click="save">
      <span class="text-white">{{ $t('Save') }}</span>
    </button>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Tag } from '~/models/Tag'
import { Todo } from '~/models/Todo'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'
import { useSettingStore } from '~/store/setting.store'

const router = useRouter()
const route = useRoute()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const settingStore = useSettingStore()

const isEditMode = computed(() => !isNaN(Number(route.params.id)))

const getToday = () => {
  const today = new Date()

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷팅
  const day = String(today.getDate()).padStart(2, '0') // 날짜를 두 자리로 포맷팅

  return `${year}-${month}-${day}`
}

const textArea = ref<HTMLTextAreaElement>()
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

const tagId = ref<string>()
const setTag = (event: Event) => {
  const value = (<HTMLInputElement>event.target).value
  tagId.value = value
}

const save = async () => {
  const data: Partial<Todo> = {
    description: toValue(description),
    upto: toValue(upto),
    modified: new Date().getTime(),
  }

  if (!toValue(isEditMode)) {
    const now = new Date()
    const customDate = new Date(String(route.query.date))
    customDate.setHours(now.getHours())
    customDate.setMinutes(now.getMinutes())
    customDate.setSeconds(now.getSeconds())

    data.created = route.query.date ? customDate.getTime() : now.getTime()
  }

  data.date = toValue(upto) ? toValue(date) : undefined
  data.time = toValue(upto) ? toValue(time) : undefined

  data.tagId = toValue(tagId)

  toValue(isEditMode)
    ? await todoStore.updateTodo(Number(route.params.id), data)
    : await todoStore.addTodo(<Todo>data)
  todoStore.getAllTodos(true)
  router.back()
}

const loadTodo = async () => {
  const todo = await todoStore.getTodo(Number(route.params.id))
  if (todo) {
    description.value = todo.description
    tagId.value = String(todo.tagId)
    upto.value = todo.upto || false

    if (toValue(upto)) {
      date.value = todo.date
      time.value = todo.time
    }
    setTimeout(() => resizeTextArea())

    if (todo.expired) storageStore.addReadExpiredTodo(String(route.params.id))
  }
}

const changeForm = (event: Event) => {
  if (
    !confirm(
      'Pressing the button will delete your written content. Do you want to proceed?'
    )
  )
    return

  const value = (<HTMLSelectElement>event.target).value
  description.value =
    value === 'None'
      ? ''
      : settingStore.setting?.forms.find((form) => form.id === value)
          ?.description
}

onMounted(() => {
  if (toValue(isEditMode)) loadTodo()
})
</script>

<style></style>
