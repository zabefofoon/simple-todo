import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const todoLoading = ref(true)
  const setTodoLoading = (value: boolean) => (todoLoading.value = value)
  const withTodoLoading = async (cb: () => void) => {
    setTodoLoading(true)
    await cb()
    setTodoLoading(false)
  }
  return {
    todoLoading,
    setTodoLoading,
    withTodoLoading,
  }
})
