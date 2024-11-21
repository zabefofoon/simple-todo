<template>
  <UIModal
    modal-name="TodoEditModal"
    class="ml-auto transition-all"
    :class="
      storageStore.isSNBExpanded
        ? 'lg:w-[calc(100vw-240px)]'
        : 'lg:w-[calc(100vw-52px)]'
    "
    :content-class="`w-full h-full | ${storageStore.getThemeClass(
      'bg-white',
      'bg-slate-900'
    )}`"
    overlay-class="ml-auto"
    hide-close
    :content-transition="settingStore.screen === 'lg' ? 'none' : 'slide-right'"
    @close="emit('close')">
    <HeaderInner :label="description || i18n.t('Todo')" />
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
        v-if="settingStore.screen === 'lg'"
        :todo="currentTodo"
        :description="description"
        :tag-id="tagId"
        :upto="upto"
        :date="date"
        :time="time"
        :images="images"
        @save="save"
        @upload="upload"
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
        v-else
        :todo="currentTodo"
        :description="description"
        :tag-id="tagId"
        :upto="upto"
        :date="date"
        :time="time"
        :images="images"
        @save="save"
        @upload="upload"
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
  </UIModal>
</template>

<script setup lang="ts">
import { Todo } from '~/models/Todo'

const emit = defineEmits<{
  (e: 'close' | 'update'): void
}>()

const i18n = useI18n()

const router = useRouter()
const route = useRoute()

const todoStore = useTodoStore()
const storageStore = useStorageStore()
const settingStore = useSettingStore()
const loadingStore = useLoadingStore()
const alarmStore = useAlarmStore()
const googleStore = useGoogleStore()

const currentTodo = ref<Todo>()
const setCurrentTodo = (todo?: Todo) => (currentTodo.value = todo)

const isEditMode = computed(() => route.query.edit !== 'new')

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

const base64ToBlob = (base64: string, mimeType = 'image/webp') => {
  // Base64 문자열에서 헤더 부분을 제거 (만약 포함되어 있다면)
  let byteString = atob(base64.split(',')[1])

  // 바이너리 데이터를 저장할 배열 생성
  let arrayBuffer = new ArrayBuffer(byteString.length)
  let uint8Array = new Uint8Array(arrayBuffer)

  // Base64 문자열을 바이너리로 변환하여 배열에 저장
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  // Blob 생성
  return new Blob([uint8Array], { type: mimeType })
}

const clickedSave = ref(false)
const setClickedSave = (value: boolean) => (clickedSave.value = value)
const save = async () => {
  setClickedSave(true)
  const translateId = isNaN(Number(currentTodo.value?.id))
    ? undefined
    : currentTodo.value?.id

  const data: Partial<Todo> = {
    id: isEditMode.value ? translateId : undefined,
    description: toValue(description),
    upto: toValue(upto),
    modified: new Date().getTime(),
    images: images.value.map((image) =>
      image.startsWith('data:') ? base64ToBlob(image) : image
    ),
    linked: undefined,
    date: upto.value ? date.value : undefined,
    time: upto.value ? time.value : undefined,
    tagId: tagId.value,
    created: currentTodo.value?.created,
  }

  if (!isEditMode.value) {
    const now = new Date()
    const customDate = new Date(String(route.query.date))
    customDate.setHours(now.getHours())
    customDate.setMinutes(now.getMinutes())
    customDate.setSeconds(now.getSeconds())

    data.created = route.query.date ? customDate.getTime() : now.getTime()
  }

  if (isEditMode.value) {
    if (!data.id) {
      await todoStore.addTodo(<Todo>data)
      todoStore.todos?.push(Todo.of(data))
    } else todoStore.updateTodo(String(route.query.edit), data)
  } else {
    await todoStore.addTodo(<Todo>data)
    todoStore.todos?.push(Todo.of(data))
  }

  if (isChanged.value) {
    if (upto.value) {
      const isAfter = new Date(`${date.value} ${time.value}`) > new Date()
      if (isAfter) registAlarm(data)

      if (isEditMode.value) {
        alarmStore.removeNewAlarm(String(route.query.edit))
        alarmStore.removeReadNewAlarms(String(route.query.edit))
      }
    } else if (route.query.edit !== 'new')
      unregistAlarm(String(route.query.edit))
  }
  emit('update')

  if (isNaN(Number(currentTodo.value?.id))) {
    if (i18n.locale.value === i18n.defaultLocale) router.replace(`/`)
    else router.replace(`/${i18n.locale.value}`)

    return
  }

  router.back()
}

const upload = async () => {
  setClickedSave(true)
  const translateId = isNaN(Number(currentTodo.value?.id))
    ? currentTodo.value?.id
    : generateUniqueId()
  const data: Partial<Todo> = {
    id: isEditMode.value ? translateId : generateUniqueId(),
    description: toValue(description),
    upto: toValue(upto),
    modified: new Date().getTime(),
    images: images.value,
    linked: 'google',
    date: upto.value ? date.value : undefined,
    time: upto.value ? time.value : undefined,
    tagId: tagId.value,
    created: currentTodo.value?.created,
  }

  if (!isEditMode.value) {
    const now = new Date()
    const customDate = new Date(String(route.query.date))
    customDate.setHours(now.getHours())
    customDate.setMinutes(now.getMinutes())
    customDate.setSeconds(now.getSeconds())

    data.created = route.query.date ? customDate.getTime() : now.getTime()
  }

  data.images = await Promise.all(
    data.images.map(async (image) => {
      if (image instanceof Blob) return await blobToBase64(image)
      return image
    })
  )

  isEditMode.value ? googleStore.updateTodo2(data) : googleStore.addTodo2(data)

  if (isChanged.value) {
    if (upto.value) {
      const isAfter = new Date(`${date.value} ${time.value}`) > new Date()
      if (isAfter) registAlarm(data)

      if (isEditMode.value) {
        alarmStore.removeNewAlarm(String(route.query.edit))
        alarmStore.removeReadNewAlarms(String(route.query.edit))
      }
    } else if (route.query.edit !== 'new')
      unregistAlarm(String(route.query.edit))
  }
  emit('update')

  if (!todoStore.todos?.find(({ id }) => id === data.id)) {
    todoStore.todos?.push(Todo.of(data))

    if (i18n.locale.value === i18n.defaultLocale) router.replace(`/`)
    else router.replace(`/${i18n.locale.value}`)

    return
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
  currentTodo.value.linked
    ? googleStore.doneTodo2(
        [currentTodo.value],
        !(currentTodo.value.done ?? true)
      )
    : todoStore.doneTodo(
        toValue(currentTodo)?.id || '',
        toValue(currentTodo)?.done
      )
  currentTodo.value.done = !toValue(currentTodo)?.done
}

const deleteTodo = async () => {
  if (!confirm(i18n.t('ConfirmDelete'))) return
  currentTodo.value?.linked
    ? googleStore.deleteTodo2([currentTodo.value])
    : await todoStore.deleteTodo(toValue(currentTodo)?.id || '')
  router.go(-2)
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
          ? String(route.query.todo)
          : todoStore.todos?.[0]?.id || ''
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

const unregistAlarm = async (todoId: string) => {
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

  if (files.length > 5) {
    alert(i18n.t('ImageLimit'))
    input.value = ''
  }

  Array.from(files).forEach((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string

        if (result) {
          const img = new Image()
          img.src = result
          img.onload = () => {
            const canvas = document.createElement('canvas')
            const maxWidth = googleStore.googleAccessToken ? 1280 : 800 // 원하는 최대 가로 크기
            const maxHeight = googleStore.googleAccessToken ? 1280 : 600 // 원하는 최대 세로 크기

            let width = img.width
            let height = img.height

            // 이미지 크기를 유지하면서 비율에 맞게 리사이즈
            if (width > height) {
              if (width > maxWidth) {
                height = (height * maxWidth) / width
                width = maxWidth
              }
            } else {
              if (height > maxHeight) {
                width = (width * maxHeight) / height
                height = maxHeight
              }
            }

            // Canvas에 크기 조정된 이미지를 그림
            canvas.width = width
            canvas.height = height

            const ctx = canvas.getContext('2d')

            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height)

              // 압축된 이미지를 Blob 형태로 변환 (품질을 지정 가능)
              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    // Base64로 변환된 결과 처리
                    blobToBase64(blob).then((base64String) => {
                      // 여기서 Base64 이미지를 처리 (예: 업로드, 미리보기 등)
                      images.value.push(base64String)
                    })
                  }
                },
                'image/webp', // 원본 이미지와 동일한 형식 유지 (JPEG, PNG 등)
                googleStore.googleAccessToken ? 1 : 0.8 // 이미지 품질 (0.0 ~ 1.0)
              )
            }
          }
        }
      }

      reader.readAsDataURL(file) // 이미지를 Base64 URL로 변환하여 미리보기
    }
  })
}

// Blob을 Base64로 변환
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result as string)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob) // Blob을 Base64로 변환
  })
}

const deleteImage = (index: number) => {
  images.value.splice(index, 1)
}

onMounted(async () => {
  if (route.query.edit !== 'new') {
    const found = todoStore.todos?.find(
      (todo) => todo.id == route.query.todo?.toString()
    )
    if (found) setCurrentTodo(found)
    else {
      const result = await todoStore.getTodo(String(route.query.todo))
      if (result) setCurrentTodo(result)
    }

    if (toValue(isEditMode)) loadTodoData()
  }

  if (route.query.tags) tagId.value = route.query.tags.toString()

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

watch(
  () => googleStore.googleInited,
  async () => {
    if (route.query.edit !== 'new') {
      const found = todoStore.todos?.find(
        (todo) => todo.id === route.query.todo?.toString()
      )
      if (found) setCurrentTodo(found)
      else {
        const result = await todoStore.getTodo(String(route.query.todo))
        if (result) setCurrentTodo(result)
      }

      if (toValue(isEditMode)) loadTodoData()
    }

    if (route.query.tags) tagId.value = route.query.tags.toString()
  },
  {
    immediate: true,
  }
)
</script>
