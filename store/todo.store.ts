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

  const getAllTodos = async (refresh?: boolean) => {
    if (toValue(todos) && !refresh) return toValue(todos)

    loadingStore.withTodoLoading(async () => {
      const data = await todoApi.getAllTodos()

      if (!data) return

      todos.value = Todo.map(data).sort(
        (a, b) => Number(b.created) - Number(a.created)
      )

      if (!data.length) {
        const defaultTodo = Todo.of({ id: 1, description: 'Welcome!' })
        addTodo(defaultTodo)
        todos.value = [defaultTodo]
      }

      if (process.client && Notification.permission !== 'granted')
        await Notification.requestPermission()
    })
    loadingStore.setTodoLoading(false)
    return toValue(todos)
  }

  const doneTodo = async (id: number, done?: boolean) => {
    await todoApi.updateTodo(id, { done: !done })
    getAllTodos(true)
  }

  const deleteTodo = async (id: number) => {
    const found = todos.value?.find((savedTodo) => savedTodo.id === id)
    const isAlarm =
      found?.upto && new Date(`${found.date} ${found.time}`) > new Date()
    if (isAlarm) alarmStore.unregistAlarm(storageStore.getUniqueId(), id)

    await todoApi.deleteTodo(id)
    getAllTodos(true)
  }

  const updateTodo = async (id: number, data: Partial<Todo>) => {
    return await todoApi.updateTodo(id, data)
  }
  const addTodo = async (todo: Todo) => {
    return await todoApi.addTodo(todo)
  }

  const refreshTodo = (todoId: number) => {
    const found = todos.value?.findIndex((savedTodo) => savedTodo.id === todoId)
    const spliced = todos.value?.splice(Number(found), 1)
    if (spliced?.[0]) todos.value?.push(spliced[0])
  }

  const getTodo = async (id: number) => {
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
  }
})
