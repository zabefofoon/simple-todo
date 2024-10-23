import { defineStore } from 'pinia'
import { Todo } from '~/models/Todo'
import etcUtil from '~/utils/etc'
import { useSettingStore } from './setting.store'
import { useTodoStore } from './todo.store'
export const useGoogleStore = defineStore(
  'google',
  () => {
    const route = useRoute()

    const todoStore = useTodoStore()
    const settingStore = useSettingStore()

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

    const readDataFromSpreadsheet2 = () => {
      return googleApi.requestAccessToken2()
    }

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
      const url = await readDataFromSpreadsheet2()
      if (route.path !== '/google-auth') location.replace(url)
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
      } else if (response.status === 401) {
        openGoogleLoginPopup()
      } else {
        console.error(response.error)
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
      } else if (response.status === 401) {
        openGoogleLoginPopup()
      } else {
        console.error(response.error)
      }
    }

    const deleteTodo2 = async (todo: Partial<Todo>) => {
      const foundIndex =
        todoStore.todos?.findIndex(({ id }) => id === todo.id) ?? -1
      todoStore.todos?.splice(foundIndex, 1)

      const index =
        googleTodos.value?.findIndex(({ id }) => id === todo.id) ?? -1
      const response = await googleApi.deleteRow2(index)
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

    const doneTodo2 = async (todo: Partial<Todo>, done: boolean) => {
      const index =
        googleTodos.value?.findIndex(({ id }) => id === todo.id) ?? -1
      const response = await googleApi.doneRow2(index, done)
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

    const unLinkGoogle = () => {
      setGoogleAccessToken()
      todoStore.todos = todoStore.todos?.filter((todo) => !todo.linked) ?? []
    }

    const syscTags = async () => {
      const res = await googleApi.syncTags(
        settingStore.setting?.tags.filter((tag) => !tag.excludeUpload) ?? []
      )
      if (settingStore.setting) settingStore.setting.tags = res.result ?? []
    }

    return {
      googleAccessToken,
      setGoogleAccessToken,

      spreadsheetInfo,
      setSpreadsheetInfo,

      googleTodos,

      readDataFromSpreadsheet2,

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
