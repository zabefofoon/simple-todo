import { defineStore } from 'pinia'
import todoApi from '~/api/todo.api'
import { Todo } from '~/models/Todo'
import { useStorageStore } from './storage.store'

export const useTodoStore = defineStore('todo', () => {
  const storageStore = useStorageStore()

  const todos = ref<Todo[]>()

  const getAllTodos = async (refresh?: boolean) => {
    if (toValue(todos) && !refresh) {
      return toValue(todos)
    }

    const data = await todoApi.getAllTodos()
    if (!data.length) addTodo(Todo.of({ description: 'Welcome!' }))

    todos.value = Todo.map(data).sort(
      (a, b) => Number(b.created) - Number(a.created)
    )

    await Notification.requestPermission()
    navigator.serviceWorker.controller?.postMessage({
      type: 'registerTimer',
      todos: data.filter((todo) => todo.upto),
    })

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
  }
})