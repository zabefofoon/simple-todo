<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <header
        class="flex items-center gap-3 | py-2 px-4 | border-b | overflow-hidden"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
        <button name="Back" class="flex" @click="$router.back()">
          <i
            class="icon icon-arrow-left"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
        </button>
        <div
          class="w-full lg:max-w-[50%] | text-lg truncate | cursor-pointer"
          @click="$router.back()">
          <span
            v-if="isEditMode"
            :class="storageStore.getThemeClass('', 'text-white')">
            {{ description || $t('Todo') }}
          </span>
          <span v-else :class="storageStore.getThemeClass('', 'text-white')">
            {{ $t('Todo') }}
          </span>
        </div>
      </header>
    </template>
    <div
      v-if="loadingStore.todoLoading"
      class="h-full | flex items-center justify-center">
      <Spinner />
    </div>
    <template v-else>
      <div class="p-4">
        <div class="flex flex-col gap-6 lg:gap-2 | relative">
          <textarea
            ref="textArea"
            :value="description"
            class="lg:order-2 | border rounded-lg | h-auto min-h-[60vh] max-h-[60vh] resize-none | p-2 lg:pt-2"
            :class="[
              { 'pt-6': currentTodo },
              storageStore.getThemeClass(
                '',
                'bg-slate-900 text-white border-slate-700'
              ),
            ]"
            :placeholder="$t('Description')"
            @input="textAreaInputhandler"
            @change="setDescription" />
          <div
            class="w-full | px-2 | absolute top-1 right-0 | flex items-center justify-between">
            <button
              v-if="currentTodo"
              name="Check"
              class="flex lg:hidden | rounded-full"
              :class="
                currentTodo?.done ? 'bg-green-500' : 'border border-slate-400'
              "
              @click="done">
              <i
                class="icon icon-check text-sm"
                :class="
                  currentTodo?.done
                    ? 'text-white'
                    : storageStore.getThemeClass('text-slate-500', 'text-white')
                "></i>
            </button>
            <button
              v-if="currentTodo"
              name="Delete"
              class="flex lg:hidden"
              @click="deleteTodo">
              <i
                class="icon icon-close | text-lg"
                :class="storageStore.getThemeClass('', 'text-white')"></i>
            </button>
          </div>
          <div class="flex flex-col lg:flex-row gap-2 lg:items-center">
            <div
              class="flex gap-2 flex-col lg:flex-row lg:items-center | w-full">
              <div class="flex gap-2">
                <div class="w-full | relative">
                  <label
                    class="absolute top-0 left-0 -translate-y-1/2 | text-[9px] | rounted-full"
                    :class="
                      storageStore.getThemeClass(
                        'bg-white',
                        'bg-slate-900 text-white'
                      )
                    ">
                    {{ $t('Form') }}
                  </label>
                  <select
                    class="w-full lg:w-fit | text-sm | px-2 py-1 | border rounded-lg"
                    :class="
                      storageStore.getThemeClass(
                        'bg-white',
                        'dark | bg-slate-900 | text-white | border-slate-700'
                      )
                    "
                    @change="changeForm">
                    <option
                      value="None"
                      :class="storageStore.getThemeClass('', 'text-white')">
                      {{ $t('None') }}
                    </option>
                    <option
                      v-for="form in settingStore.setting?.forms"
                      :key="form.id"
                      :value="form.id"
                      :class="storageStore.getThemeClass('', 'text-white')">
                      {{ form.title }}
                    </option>
                  </select>
                </div>
                <div class="w-full | relative">
                  <label
                    class="flex items-center gap-0.5 | absolute top-0 left-0 -translate-y-1/2 | text-[9px] | rounted-full"
                    :class="
                      storageStore.getThemeClass(
                        'bg-white',
                        'bg-slate-900 text-white'
                      )
                    ">
                    <div
                      v-if="tagId"
                      class="w-2 h-2"
                      :style="{
                        background: settingStore.setting?.tags.find(
                          (tag) => tag.id === tagId
                        )?.color,
                      }"></div>
                    <span :class="storageStore.getThemeClass('', 'text-white')">
                      {{ $t('Tag') }}
                    </span>
                  </label>
                  <select
                    class="w-full lg:w-fit | text-sm | px-2 py-1 | border rounded-lg"
                    :value="tagId"
                    :class="
                      storageStore.getThemeClass(
                        'bg-white',
                        'dark | bg-slate-900 | text-white | border-slate-700'
                      )
                    "
                    @change="setTag">
                    <option
                      :value="''"
                      :class="storageStore.getThemeClass('', 'text-white')">
                      {{ $t('None') }}
                    </option>
                    <option
                      v-for="tag in settingStore.setting?.tags"
                      :key="tag.id"
                      :value="tag.id"
                      :class="storageStore.getThemeClass('', 'text-white')">
                      {{ tag.label }}
                    </option>
                  </select>
                </div>
              </div>
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
                  :style="{ opacity: upto ? '1' : '.4' }"
                  :class="storageStore.getThemeClass('', 'border-slate-700')">
                  <i
                    class="icon icon-timer"
                    :class="storageStore.getThemeClass('', 'text-white')"></i>
                  <span :class="storageStore.getThemeClass('', 'text-white')">
                    {{ $t('Upto') }}
                  </span>
                </label>
                <div
                  v-if="upto"
                  class="flex gap-1 lg:gap-2 | ml-auto lg:ml-0"
                  :style="{ opacity: upto ? '1' : '.4' }">
                  <input
                    :value="date"
                    class="w-fit | border rounded-lg | p-2 | text-xs"
                    type="date"
                    :class="
                      storageStore.getThemeClass(
                        'bg-white',
                        'dark | bg-slate-900 text-white | border-slate-700'
                      )
                    "
                    @change="setDate" />
                  <input
                    :value="time"
                    class="w-fit | border rounded-lg | px-2 py-1 | text-xs"
                    :class="
                      storageStore.getThemeClass(
                        'bg-white',
                        'dark | bg-slate-900 text-white | border-slate-700'
                      )
                    "
                    type="time"
                    @change="setTime" />
                </div>
              </div>
            </div>
            <button
              v-if="currentTodo"
              name="Check"
              class="hidden lg:flex | rounded-full"
              :class="
                currentTodo?.done
                  ? 'bg-green-500'
                  : storageStore.getThemeClass(
                      'border border-slate-400',
                      'border border-white'
                    )
              "
              @click="done">
              <i
                class="icon icon-check"
                :class="
                  currentTodo?.done
                    ? 'text-white'
                    : storageStore.getThemeClass('text-slate-500', 'text-white')
                "></i>
            </button>
            <button
              v-if="currentTodo"
              name="Delete"
              class="hidden lg:flex"
              @click="deleteTodo">
              <i
                class="icon icon-close | text-xl"
                :class="storageStore.getThemeClass('', 'text-white')"></i>
            </button>
            <button
              name="Save"
              class="hidden lg:block | bg-slate-800 | text-white rounded-full | px-5 py-1 ml-auto"
              @click="save">
              <span class="text-white whitespace-nowrap">{{ $t('Save') }}</span>
            </button>
          </div>
        </div>
      </div>
      <button
        name="Save"
        class="lg:hidden | w-[96vw] | bg-slate-800 | text-white rounded-full | py-3 lg:py-2 mx-auto mt-auto mb-4"
        @click="save">
        <span class="text-white">{{ $t('Save') }}</span>
      </button>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Todo } from '~/models/Todo'
import { useLoadingStore } from '~/store/loading.store'
import { useSettingStore } from '~/store/setting.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'
import { useAlarmStore } from '~/store/alarm.store'

const i18n = useI18n()

const router = useRouter()
const route = useRoute()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const settingStore = useSettingStore()
const loadingStore = useLoadingStore()
const alarmStore = useAlarmStore()

const currentTodo = ref<Todo>()
const setCurrentTodo = (todo?: Todo) => (currentTodo.value = todo)

const isEditMode = computed(() => {
  return !isNaN(Number(route.params.id))
})

const getToday = () => {
  const today = new Date()

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷팅
  const day = String(today.getDate()).padStart(2, '0') // 날짜를 두 자리로 포맷팅

  return `${year}-${month}-${day}`
}

const textArea = ref<HTMLTextAreaElement>()
const textAreaInputhandler = () => {
  checkChanged(true)
  resizeTextArea()
}
const resizeTextArea = () => {
  if (!textArea.value) return

  textArea.value.style.height = `0px`
  textArea.value.style.height = `${textArea.value.scrollHeight}px`
}

const isChanged = ref(false)
const checkChanged = (value: boolean) => (isChanged.value = value)

const upto = ref(false)
const setUpto = (event: Event) => {
  const value = (<HTMLInputElement>event.target).checked
  upto.value = value
  checkChanged(true)
}

const date = ref<string | undefined>(getToday()) //2024-01-03
const setDate = (event: Event) => {
  const value = (<HTMLInputElement>event.target).value
  date.value = value
  checkChanged(true)
}

const getCurrentTime = () => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0') // 현재 시간을 가져오고, 한 자리 수인 경우 앞에 0을 추가합니다.
  const minutes = now.getMinutes().toString().padStart(2, '0') // 현재 분을 가져오고, 한 자리 수인 경우 앞에 0을 추가합니다.
  return `${hours}:${minutes}`
}
const time = ref<string | undefined>(getCurrentTime()) //12:36
const setTime = (event: Event) => {
  const value = (<HTMLInputElement>event.target).value
  time.value = value
  checkChanged(true)
}

const description = ref()
const setDescription = (event: Event) => {
  const value = (<HTMLInputElement>event.target).value
  description.value = value
  checkChanged(true)
}

const tagId = ref<string>()
const setTag = (event: Event) => {
  const value = (<HTMLInputElement>event.target).value
  tagId.value = value
}

const clickedSave = ref(false)
const setClickedSave = (value: boolean) => (clickedSave.value = value)
const save = async () => {
  setClickedSave(true)
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
  await todoStore.getAllTodos(true)

  if (upto.value) {
    const isAfter = new Date(`${date.value} ${time.value}`) > new Date()
    if (isAfter) registAlarm(data)
  }

  router.back()
}

const loadTodoData = async () => {
  if (toValue(currentTodo)) {
    description.value = toValue(currentTodo)?.description
    tagId.value = toValue(currentTodo)?.tagId
      ? String(toValue(currentTodo)?.tagId)
      : undefined
    upto.value = toValue(currentTodo)?.upto || false

    if (toValue(upto)) {
      date.value = toValue(currentTodo)?.date
      time.value = toValue(currentTodo)?.time
    }
    setTimeout(() => resizeTextArea())

    if (toValue(currentTodo)?.expired)
      storageStore.addReadExpiredTodo(String(route.params.id))
  }
}

const changeForm = (event: Event) => {
  if (!confirm(i18n.t('ConfirmApplyForm'))) return

  const value = (<HTMLSelectElement>event.target).value
  description.value =
    value === 'None'
      ? ''
      : settingStore.setting?.forms.find((form) => form.id === value)
          ?.description
}

const done = () => {
  if (!currentTodo.value) return

  todoStore.doneTodo(
    Number(toValue(currentTodo)?.id),
    toValue(currentTodo)?.done
  )
  currentTodo.value.done = !toValue(currentTodo)?.done
}

const deleteTodo = async () => {
  if (!confirm(i18n.t('ConfirmDelete'))) return
  await todoStore.deleteTodo(Number(toValue(currentTodo)?.id))
  router.back()
}

const registAlarm = async (todo: Partial<Todo>) => {
  if (!('serviceWorker' in navigator)) return

  const permission = await Notification.requestPermission()
  if (permission === 'granted') {
    const deviceId = storageStore.getUniqueId()
      ? storageStore.getUniqueId()
      : storageStore.setUniqueId()

    const registrations = await navigator.serviceWorker.getRegistrations()
    for (const registration of registrations) {
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY, // 발급받은 vapid public key
      })
      try {
        const todoId = isEditMode.value
          ? Number(route.params.id)
          : todoStore.todos?.[0]?.id || 1
        alert(new Date(`${date.value} ${time.value}`))
        const res = await alarmStore.registAlarm({
          date: new Date(`${date.value} ${time.value}`),
          text: todo.description!.slice(0, 30),
          todoId,
          deviceId,
          pushSubscription,
        })
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    }
  }
}

const beforeunloadHandler = (event: BeforeUnloadEvent) => event.preventDefault()

onMounted(async () => {
  if (route.params.id !== 'new') {
    const result = await todoStore.getTodo(Number(route.params.id))
    setCurrentTodo(result)
    if (toValue(isEditMode)) loadTodoData()
  }

  window.addEventListener('beforeunload', beforeunloadHandler)
})

onBeforeUnmount(() =>
  window.removeEventListener('beforeunload', beforeunloadHandler)
)

onBeforeRouteLeave((to, from, next) => {
  if (!toValue(isChanged)) {
    next()
    return
  }

  if (toValue(clickedSave)) {
    next()
    return
  }

  next(confirm(i18n.t('ConfirmBeforeWriting')))
})
</script>

<style></style>
