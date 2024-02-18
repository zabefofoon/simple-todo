import { defineStore } from 'pinia'
import todoApi from '~/api/todo.api'

export const useBulkStore = defineStore('bulk', () => {
  const route = useRoute()
  const router = useRouter()

  const isBulkMode = computed(() => route.query.bulk)
  const turnOnBulkMode = async (todoId?: number) => {
    await router.push({ query: { ...route.query, bulk: 'true' } })
    setTimeout(() => (selectedTodoIds.value = [todoId]), 100)
  }

  const selectedTodoIds = ref<(number | undefined)[]>([])
  const emptyTodoIds = () => (selectedTodoIds.value = [])
  const add = (todoId = 0) => {
    toValue(selectedTodoIds).includes(todoId)
      ? (selectedTodoIds.value = selectedTodoIds.value.filter(
          (id) => id !== todoId
        ))
      : selectedTodoIds.value.push(todoId)
  }

  const updateBulkTodos = async (done?: boolean) => {
    const ids = toValue(selectedTodoIds).filter(
      (item): item is number => !!item
    )
    await todoApi.updateBulkTodos(ids, { done })
  }
  const deleteBulkTodos = async () => {
    const ids = toValue(selectedTodoIds).filter(
      (item): item is number => !!item
    )
    await todoApi.deleteBulkTodos(ids)
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
