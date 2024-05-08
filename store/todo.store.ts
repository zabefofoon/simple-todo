import { defineStore } from 'pinia'
import todoApi from '~/api/todo.api'
import { Todo } from '~/models/Todo'
import { useStorageStore } from './storage.store'
import { useLoadingStore } from './loading.store'
import { deepClone } from '~/utils/etc'

export const useTodoStore = defineStore('todo', () => {
  const storageStore = useStorageStore()
  const loadingStore = useLoadingStore()

  const todos = ref<Todo[]>()

  const getAllTodos = async (refresh?: boolean) => {
    if (toValue(todos) && !refresh) return toValue(todos)

    loadingStore.withTodoLoading(async () => {
      const data = await todoApi.getAllTodos()

      todos.value = Todo.map(data).sort(
        (a, b) => Number(b.created) - Number(a.created)
      )

      if (!data.length) {
        const defaultTodo = Todo.of({ id: 1, description: 'Welcome!' })
        addTodo(defaultTodo)
        todos.value = [defaultTodo]
      }

      if (process.client) {
        if (Notification.permission !== 'granted')
          await Notification.requestPermission()

        if (Notification.permission)
          navigator.serviceWorker?.controller?.postMessage({
            type: 'registerTimer',
            todos:
              todos.value
                ?.filter((todo) => todo.upto)
                .filter((todo) => {
                  const now = new Date()
                  const time = new Date(`${todo.date} ${todo.time}`)
                  return time >= now
                })
                .map((todo) => deepClone(todo)) || [],
          })
      }
    })
    loadingStore.setTodoLoading(false)
    return toValue(todos)
  }

  const doneTodo = async (id: number, done?: boolean) => {
    await todoApi.updateTodo(id, { done: !done })
    getAllTodos(true)
  }

  const deleteTodo = async (id: number) => {
    await todoApi.deleteTodo(id)
    getAllTodos(true)
  }

  const updateTodo = async (id: number, data: Partial<Todo>) => {
    return await todoApi.updateTodo(id, data)
  }
  const addTodo = async (todo: Todo) => {
    return await todoApi.addTodo(todo)
  }

  const refreshTodo = (todo: Todo) => {
    const found = todos.value?.findIndex(
      (savedTodo) => savedTodo.id === todo.id
    )
    todos.value?.splice(Number(found), 1)
    todos.value?.push(todo)
  }

  const getTodo = async (id: number) => {
    const data = await todoApi.getTodo(id)
    return data ? Todo.of(data) : undefined
  }

  const expiredTodos = computed(() =>
    toValue(todos)
      ?.filter((todo) => todo.expired)
      .sort(
        (a, b) =>
          new Date(`${b.date} ${b.time}`).getTime() -
          new Date(`${a.date} ${a.time}`).getTime()
      )
  )

  const hasUnCheckedTodos = computed(() => {
    return !!toValue(expiredTodos)?.find(
      (todo) => !storageStore.readExpiredTodos?.includes(String(todo.id))
    )
  })

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

    expiredTodos,
    hasUnCheckedTodos,

    importTodos,
  }
})
