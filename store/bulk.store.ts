import { defineStore } from 'pinia'
import todoApi from '~/api/todo.api'
import type { Todo } from '~/models/Todo'
import { useGoogleStore } from './google.store'
import { useTodoStore } from './todo.store'

export const useBulkStore = defineStore('bulk', () => {
  const route = useRoute()
  const router = useRouter()
  const todoStore = useTodoStore()
  const googleStore = useGoogleStore()
  const isBulkMode = computed(() => route.query.bulk)
  const turnOnBulkMode = async (todoId?: string) => {
    await router.push({ query: { ...route.query, bulk: 'true' } })
    setTimeout(() => (selectedTodoIds.value = [todoId]), 100)
  }

  const selectedTodoIds = ref<(string | undefined)[]>([])
  const emptyTodoIds = () => (selectedTodoIds.value = [])
  const add = (todoId = '') => {
    toValue(selectedTodoIds).includes(todoId)
      ? (selectedTodoIds.value = selectedTodoIds.value.filter(
          (id) => id !== todoId
        ))
      : selectedTodoIds.value.push(todoId)
  }

  const updateBulkTodos = async (done?: boolean) => {
    const todos = selectedTodoIds.value
      .map((id) =>
        todoStore.todos?.find((todo) => todo.id === id && todo.linked)
      )
      .filter((todo): todo is Todo => !!todo)

    googleStore.doneTodo2(todos, done ?? false)

    const unLinkedIds = selectedTodoIds.value
      .map(
        (id) =>
          todoStore.todos?.find((todo) => todo.id === id && !todo.linked)?.id
      )
      .filter((id): id is string => !!id)
    const linkedIds = selectedTodoIds.value
      .map(
        (id) =>
          todoStore.todos?.find((todo) => todo.id === id && todo.linked)?.id
      )
      .filter((id): id is string => !!id)

    todoApi.updateBulkTodos(unLinkedIds, { done })

    return [...linkedIds, ...unLinkedIds]
  }
  const deleteBulkTodos = async () => {
    const todos = selectedTodoIds.value
      .map((id) =>
        todoStore.todos?.find((todo) => todo.id === id && todo.linked)
      )
      .filter((todo): todo is Todo => !!todo)

    googleStore.deleteTodo2(todos)

    const linkedIds = selectedTodoIds.value
      .map(
        (id) =>
          todoStore.todos?.find((todo) => todo.id === id && todo.linked)?.id
      )
      .filter((id): id is string => !!id)

    const unLinkedIds = selectedTodoIds.value
      .map(
        (id) =>
          todoStore.todos?.find((todo) => todo.id === id && !todo.linked)?.id
      )
      .filter((id): id is string => !!id)
    todoApi.deleteBulkTodos(unLinkedIds)

    return [...linkedIds, ...unLinkedIds]
  }
  return {
    isBulkMode,
    turnOnBulkMode,

    selectedTodoIds,
    emptyTodoIds,
    add,

    updateBulkTodos,
    deleteBulkTodos,
  }
})
