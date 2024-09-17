<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <HeaderInner :label="description || i18n.t('Todo')" />
    </template>
    <div
      v-if="loadingStore.todoLoading"
      class="lg:h-full | flex items-center justify-center">
      <Spinner />
    </div>
    <template v-else>
      <input
        class="hidden"
        ref="fileInputEl"
        type="file"
        accept="image/*"
        multiple
        @change="fileChangeHandler" />
      <TodoFormPC
        class="hidden lg:block"
        :todo="currentTodo"
        :description="description"
        :tag-id="tagId"
        :upto="upto"
        :date="date"
        :time="time"
        :images="images"
        @save="save"
        @delete="deleteTodo"
        @done="done"
        @set-date="setDate"
        @set-time="setTime"
        @set-upto="setUpto"
        @set-tag="setTag"
        @set-description="setDescription"
        @changed="checkChanged(true)"
        @change-form="changeForm"
        @add-image="addImage"
        @delete-image="deleteImage" />
      <TodoFormMobile
        :todo="currentTodo"
        :description="description"
        :tag-id="tagId"
        :upto="upto"
        :date="date"
        :time="time"
        :images="images"
        @save="save"
        @delete="deleteTodo"
        @done="done"
        @set-date="setDate"
        @set-time="setTime"
        @set-upto="setUpto"
        @set-tag="setTag"
        @set-description="setDescription"
        @changed="checkChanged(true)"
        @change-form="changeForm"
        @add-image="addImage"
        @delete-image="deleteImage" />
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

const isEditMode = computed(() => !isNaN(Number(route.params.id)))

const getToday = () => {
  const today = new Date()

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷팅
  const day = String(today.getDate()).padStart(2, '0') // 날짜를 두 자리로 포맷팅

  return `${year}-${month}-${day}`
}

const isChanged = ref(false)
const checkChanged = (value: boolean) => (isChanged.value = value)

const upto = ref(false)
const setUpto = (event: Event) => {
  const value = (<HTMLInputElement>event.target).checked
  upto.value = value
  checkChanged(true)
  date.value = getToday()
  time.value = getCurrentTime()
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
    images: deepClone(toValue(images)),
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

  if (isChanged.value) {
    if (upto.value) {
      const isAfter = new Date(`${date.value} ${time.value}`) > new Date()
      if (isAfter) registAlarm(data)

      if (isEditMode.value) {
        alarmStore.removeNewAlarm(Number(route.params.id))
        alarmStore.removeReadNewAlarms(Number(route.params.id))
      }
    } else unregistAlarm(Number(route.params.id))
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

    images.value = currentTodo.value?.images ?? []
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

        await alarmStore.registAlarm({
          date: new Date(`${date.value} ${time.value}`),
          text: todo.description!.slice(0, 30),
          deviceId,
          todoId,
          pushSubscription,
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}

const unregistAlarm = async (todoId: number) => {
  return await alarmStore.unregistAlarm(storageStore.getUniqueId(), todoId)
}

const beforeunloadHandler = (event: BeforeUnloadEvent) => event.preventDefault()

const saveByKey = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.code === 'KeyS') {
    event.preventDefault()
    ;(<HTMLTextAreaElement>event.target)?.blur?.()
    setTimeout(() => save(), 100)
  }
}

const fileInputEl = ref<HTMLInputElement>()
const images = ref<string[]>([])
const addImage = () => {
  fileInputEl.value?.click()
}

const fileChangeHandler = (event: Event): void => {
  const input = event.target as HTMLInputElement
  const files = input.files

  if (!files) return

  Array.from(files).forEach((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result?.toString() ?? ''
        if (result) images.value.push(result)
      }

      reader.readAsDataURL(file) // 이미지를 Base64 URL로 변환하여 미리보기
    } else {
      alert('이미지 파일을 선택해주세요.')
    }
  })
}

const deleteImage = (index: number) => {
  images.value.splice(index, 1)
}

onMounted(async () => {
  if (route.params.id !== 'new') {
    const result = await todoStore.getTodo(Number(route.params.id))
    setCurrentTodo(result)
    if (toValue(isEditMode)) loadTodoData()
  }

  window.addEventListener('beforeunload', beforeunloadHandler)
  window.addEventListener('keydown', saveByKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', beforeunloadHandler)
  window.removeEventListener('keydown', saveByKey)
})

onBeforeRouteLeave((_, __, next) => {
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
