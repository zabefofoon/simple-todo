import { defineStore } from 'pinia'
import todoApi from '~/api/todo.api'
import { Todo } from '~/models/Todo'
import { useAlarmStore } from './alarm.store'
import { useLoadingStore } from './loading.store'
import { useStorageStore } from './storage.store'

import { generateUniqueId } from '~/utils/etc'

export const useTodoStore = defineStore('todo', () => {
  const storageStore = useStorageStore()
  const loadingStore = useLoadingStore()
  const alarmStore = useAlarmStore()

  const todos = ref<Todo[]>()

  const getAllTodos = async (refresh?: boolean) => {
    if (toValue(todos) && !refresh) return toValue(todos)

    loadingStore.withTodoLoading(async () => {
      const data = await todoApi.getAllTodos()

      if (!data) return

      todos.value = Todo.map(data).sort(
        (a, b) => Number(b.created) - Number(a.created)
      )

      if (!data.length) {
        const defaultTodo = Todo.of({
          id: generateUniqueId(),
          description: 'Welcome!',
        })
        addTodo(defaultTodo)
        todos.value = [defaultTodo]
      }

      if (process.client && Notification.permission !== 'granted')
        await Notification.requestPermission()
    })
    loadingStore.setTodoLoading(false)

    return toValue(todos)
  }

  const doneTodo = async (id: string, done?: boolean) => {
    const found = todos.value?.find(({ id: _id }) => _id == id)
    if (found) Object.assign(found, { done })

    await todoApi.updateTodo(id, { done })
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
    console.log('todo: ', todo)
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
      return todo
    })
    todoApi.bulkAdd(result)
    getAllTodos(true)
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
