import { defineStore } from 'pinia'
import todoApi from '~/api/todo.api'
import { Todo } from '~/models/Todo'
import { useAlarmStore } from './alarm.store'
import { useLoadingStore } from './loading.store'
import { useStorageStore } from './storage.store'

export const useTodoStore = defineStore('todo', () => {
  const storageStore = useStorageStore()
  const loadingStore = useLoadingStore()
  const alarmStore = useAlarmStore()

  const todos = ref<Todo[]>()

  const getAllTodos = async () => {
    await loadingStore.withTodoLoading(async () => {
      const data = await todoApi.getAllTodos()

      if (data?.length) {
        const _todos = Todo.map(data)
          .sort((a, b) => Number(b.created) - Number(a.created))
          .filter((todo) => !todos.value?.map(({ id }) => id).includes(todo.id))

        todos.value ? todos.value.push(..._todos) : (todos.value = _todos)
      } else {
        const defaultTodo = Todo.of({
          id: 1,
          description: 'Welcome!',
        })
        await addTodo(defaultTodo)
        todos.value = [defaultTodo]
      }
    })

    return todos.value
  }

  const doneTodo = async (id: string, done?: boolean) => {
    await todoApi.updateTodo(id, { done: !done })
  }

  const deleteTodo = async (id: string) => {
    const found = todos.value?.find((savedTodo) => savedTodo.id === id)
    const isAlarm =
      found?.upto && new Date(`${found.date} ${found.time}`) > new Date()
    if (isAlarm) alarmStore.unregistAlarm(storageStore.getUniqueId(), id)

    await todoApi.deleteTodo(id)
    todos.value = todos.value?.filter((todo) => todo.id !== id) ?? []
  }

  const updateTodo = async (id: string, todo: Partial<Todo>) => {
    const found = todos.value?.find(({ id }) => id == todo.id)
    if (found) Object.assign(found, todo)
    await todoApi.updateTodo(id, todo)
  }
  const addTodo = async (todo: Todo) => {
    return await todoApi.addTodo(todo)
  }

  const refreshTodo = (todoId: string) => {
    const found = todos.value?.findIndex((savedTodo) => savedTodo.id === todoId)
    const spliced = todos.value?.splice(Number(found), 1)
    if (spliced?.[0]) todos.value?.push(spliced[0])
  }

  const getTodo = async (id: string) => {
    const data = await todoApi.getTodo(id)

    return data ? Todo.of(data) : undefined
  }

  const importTodos = (savedTodos: Todo[]) => {
    const result = savedTodos.map((todo) => {
      delete todo.id
      todo.images = todo.images?.map((image) =>
        typeof image === 'string' && image.startsWith?.('data:')
          ? etc.base64ToBlob(image)
          : image,
      )
      return todo
    })
    todoApi.bulkAdd(result)
    getAllTodos()
  }

  const getImages = async (id: string) => {
    const result = await getTodo(id)
    return result?.images
  }

  return {
    todos,
    getAllTodos,
    doneTodo,
    deleteTodo,
    updateTodo,
    addTodo,
    getTodo,
    refreshTodo,

    importTodos,

    getImages,
  }
})
