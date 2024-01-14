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

  return {
    todos,
    getAllTodos
  }
})
