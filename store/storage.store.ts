import { defineStore } from 'pinia'
import storageApi from '~/api/storage.api'

export const useStorageStore = defineStore('storage', () => {
  const removeKeywords = (keyword: string) => {
    let keywords = getRecentKeywords()
    keywords = keywords.filter((savedKeyword) => savedKeyword !== keyword)
    storageApi.setLocalStorage('recentKeywords', JSON.stringify(keywords))
  }

  const addRecentKeywords = (keyword: string) => {
    if (!keyword) return

    let keywords = getRecentKeywords()
    if (keywords.includes(keyword)) {
      keywords = keywords.filter((savedKeyword) => savedKeyword !== keyword)
      keywords.unshift(keyword)
    } else keywords.unshift(keyword)

    keywords = keywords.filter((_, index) => index < 10)
    storageApi.setLocalStorage('recentKeywords', JSON.stringify(keywords))
  }

  const getRecentKeywords = (): string[] => {
    const saved = storageApi.getLocalStorage('recentKeywords') || '[]'
    return JSON.parse(saved)
  }

  const readExpiredTodos = ref<string[]>()
  const setReadExpiredTodos = (value: string[]) =>
    (readExpiredTodos.value = value)

  const addReadExpiredTodo = (id: string) => {
    if (!id) return

    let readTodoIds = getReadExpiredTodo()
    if (readTodoIds.includes(id)) {
      readTodoIds = readTodoIds.filter((savedKeyword) => savedKeyword !== id)
      readTodoIds.unshift(id)
    } else readTodoIds.unshift(id)

    readTodoIds = readTodoIds.filter((_, index) => index < 10)
    setReadExpiredTodos(readTodoIds)
    storageApi.setLocalStorage('readExpiredTodos', JSON.stringify(readTodoIds))
  }

  const getReadExpiredTodo = (): string[] => {
    const saved = storageApi.getLocalStorage('readExpiredTodos') || '[]'
    setReadExpiredTodos(saved)
    return JSON.parse(saved)
  }

  return {
    addRecentKeywords,
    getRecentKeywords,
    removeKeywords,

    readExpiredTodos,
    addReadExpiredTodo,
    getReadExpiredTodo,
  }
})
