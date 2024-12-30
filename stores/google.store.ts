import { defineStore } from 'pinia'
import settingApi from '~/api/setting.api'
import { Tag } from '~/models/Tag'
import { Todo } from '~/models/Todo'
import etcUtil from '~/utils/etc'
import { useSettingStore } from './setting.store'
import { useTodoStore } from './todo.store'

export const useGoogleStore = defineStore(
  'google',
  () => {
    const i18n = useI18n()
    const todoStore = useTodoStore()
    const settingStore = useSettingStore()
    const snackbarStore = useSnackbarStore()

    const googleApi = useGoogleApi()
    const googleTodos = ref<Record<string, string>[]>()

    const googleInited = ref(false)
    const setGoogleInited = (value: boolean) => (googleInited.value = value)

    const googleAccessToken = ref()
    const setGoogleAccessToken = (value?: string) =>
      (googleAccessToken.value = value)

    const googleRefreshToken = ref('')
    const setGoogleRefreshToken = (value: string) =>
      (googleRefreshToken.value = value)

    const spreadsheetInfo = ref()
    const setSpreadsheetInfo = (value: unknown) =>
      (spreadsheetInfo.value = value)

    const spreadsheetId = ref('')
    const setSpreadsheetId = (value: string) => (spreadsheetId.value = value)

    const getAllTodo = async () => {
      const response = await googleApi.getAllRows()

      if (response.status === 200) {
        googleTodos.value = response?.result.map((todo) => ({
          id: todo.id,
          created: todo.created,
          images: todo.images,
        }))

        const todos = response?.result
          .map(Todo.spreadsheetOf)
          .sort((a, b) => Number(b.created) - Number(a.created))
          .filter(
            (todo) => !todoStore.todos?.map(({ id }) => id).includes(todo.id)
          )

        todoStore.todos
          ? todoStore.todos.push(...todos)
          : (todoStore.todos = todos)

        setGoogleInited(true)
      } else if (response.status === 404) {
        const response = await googleApi.createSpreadsheet2()
        setSpreadsheetId(response.result)
        getAllTodo()
        return []
      } else if (response.status === 401) {
        openGoogleLoginPopup()
      } else {
        console.error(response.message)
      }
    }

    const openGoogleLoginPopup = async () => {
      const url = await googleApi.requestAccessToken2()
      navigateTo(url, { replace: true, external: true })
    }

    const updateTodo2 = async (todo: Partial<Todo>) => {
      const found = todoStore.todos?.find(({ id }) => id === todo.id)
      if (found) Object.assign(found, todo)

      const index =
        googleTodos.value?.findIndex(({ id }) => id === todo.id) ?? -1

      const response = await googleApi.updateRow2(index, todo)
      if (response.status === 200) {
        console.log('updated')
      } else if (response.status === 404) {
        const response = await googleApi.createSpreadsheet2()
        setSpreadsheetId(response.result)
        getAllTodo()
        return []
      } else {
        console.error(response.error)
        snackbarStore.showSnackbar({
          message: i18n.t('NoticeGoogleErrorUpload'),
          type: 'error',
        })
        todo.linked = undefined
        todoStore.addTodo(
          Todo.of({
            ...todo,
          })
        )
        await sleep(500)
        if (response.status === 401) openGoogleLoginPopup()
      }
    }

    const addTodo2 = async (todo: Partial<Todo>) => {
      todoStore.todos?.push(Todo.of(todo))
      googleTodos.value?.push(todo)

      const response = await googleApi.addRow2(todo)
      if (response.status === 200) {
        console.log('pushed')
      } else if (response.status === 404) {
        const response = await googleApi.createSpreadsheet2()
        setSpreadsheetId(response.result)
        getAllTodo()
        return []
      } else {
        console.error(response.error)
        snackbarStore.showSnackbar({
          message: i18n.t('NoticeGoogleErrorUpload'),
          type: 'error',
        })
        todo.linked = undefined
        todoStore.addTodo(
          Todo.of({
            ...todo,
          })
        )
        await sleep(500)
        if (response.status === 401) openGoogleLoginPopup()
      }
    }

    const deleteTodo2 = async (todos: Partial<Todo>[]) => {
      const indexes = todos.map(
        (todo) => googleTodos.value?.findIndex(({ id }) => id === todo.id) ?? -1
      )
      todoStore.todos = todoStore.todos?.filter((todo) =>
        todos.find(({ id }) => id !== todo.id)
      )
      const response = await googleApi.deleteRow2(indexes)
      if (response.status === 200) {
        console.log('deleted')
      } else if (response.status === 404) {
        const response = await googleApi.createSpreadsheet2()
        setSpreadsheetId(response.result)
        getAllTodo()
        return []
      } else if (response.status === 401) {
        openGoogleLoginPopup()
      } else {
        console.error(response.error)
      }
    }

    const doneTodo2 = async (todos: Partial<Todo>[], done: boolean) => {
      const updates = todos
        .map(
          (todo) =>
            googleTodos.value?.findIndex(({ id }) => id === todo.id) ?? -1
        )
        .map((index) => ({ index, done }))

      const response = await googleApi.doneRow2(updates)
      if (response.status === 200) {
        console.log('updated')
      } else if (response.status === 404) {
        const response = await googleApi.createSpreadsheet2()
        setSpreadsheetId(response.result)
        getAllTodo()
        return []
      } else if (response.status === 401) {
        openGoogleLoginPopup()
      } else {
        console.error(response.error)
      }
    }

    const unLinkGoogle = async () => {
      setGoogleAccessToken()
      const cookieValue = useCookie('google').value as any
      if (cookieValue) cookieValue.googleAccessToken = ''
      todoStore.todos = todoStore.todos?.filter((todo) => !todo.linked) ?? []

      const settings = await settingApi.getSetting()
      if (settingStore.setting)
        settingStore.setting.tags = settings?.[0].tags ?? []
    }

    const syscTags = async () => {
      const res = await googleApi.syncTags(
        settingStore.setting?.tags.filter((tag) => !tag.excludeUpload) ?? []
      )

      if (settingStore.setting) {
        const another =
          res?.result
            ?.filter(
              (tag) =>
                !settingStore.setting?.tags.find((item) => item.id === tag.id)
            )
            .map(Tag.of) ?? []

        const tags = settingStore.setting.tags.filter((tag) =>
          res.result.find((item) => item.id !== tag.id)
        )

        const result = [...another, ...tags]
        settingStore.setting.tags = deepClone(result)
      }
    }

    const updateTags = async (tags: Tag[]) => {
      const res = await googleApi.updateTags(tags)
      if (settingStore.setting) settingStore.setting.tags = res?.result ?? []
    }

    const deleteTags = async (tags: Tag[]) => {
      const res = await googleApi.deleteTags(tags)
      if (settingStore.setting) settingStore.setting.tags = res?.result ?? []
    }

    return {
      googleAccessToken,
      setGoogleAccessToken,

      spreadsheetInfo,
      setSpreadsheetInfo,

      googleTodos,

      googleRefreshToken,
      setGoogleRefreshToken,

      spreadsheetId,
      getAllTodo,

      openGoogleLoginPopup,

      googleInited,
      updateTodo2,
      addTodo2,
      deleteTodo2,
      doneTodo2,

      unLinkGoogle,

      syscTags,
      updateTags,
      deleteTags,
    }
  },
  {
    persist: {
      paths: ['googleRefreshToken', 'googleAccessToken', 'spreadsheetId'],
      storage: persistedState.cookiesWithOptions({
        expires: etcUtil.getCookieExpiresNYears(10),
      }),
    },
  }
)
