import { defineStore } from 'pinia'
import todoApi from '~/api/todo.api'
import { Todo } from '~/models/Todo'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>()

  const getAllTodos = async (refresh?: boolean) => {
    if (!todos && !refresh) {
      return toValue(todos)
    }

    const data = await todoApi.getAllTodos()
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

  const getTodo = async (id: number) => {
    return await todoApi.getTodo(id)
  }

  return {
    todos,
    getAllTodos,
    doneTodo,
    deleteTodo,
    updateTodo,
    addTodo,
    getTodo,
  }
})
