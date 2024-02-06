import { defineStore } from 'pinia'
import storageApi from '~/api/storage.api'
import type { SummaryTimeType } from '~/models/Summary'

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

  const getReadExpiredTodo = (): string[] => {
    const saved = storageApi.getLocalStorage('readExpiredTodos') || '[]'
    setReadExpiredTodos(saved)
    return JSON.parse(saved)
  }

  const addReadExpiredTodo = (id: string) => {
    if (!id) return

    let readTodoIds = getReadExpiredTodo()
    if (readTodoIds.includes(id)) {
      readTodoIds = readTodoIds.filter((readTodoId) => readTodoId !== id)
      readTodoIds.unshift(id)
    } else readTodoIds.unshift(id)

    readTodoIds = readTodoIds.filter((_, index) => index < 10)
    setReadExpiredTodos(readTodoIds)
    storageApi.setLocalStorage('readExpiredTodos', JSON.stringify(readTodoIds))
  }

  const removeReadExpiredTodo = (id?: string) => {
    if (!id) return
    const readTodoIds = getReadExpiredTodo().filter(
      (readTodoId) => readTodoId !== id
    )
    setReadExpiredTodos(readTodoIds)
    storageApi.setLocalStorage('readExpiredTodos', JSON.stringify(readTodoIds))
  }

  const getSummaryTimeType = () => storageApi.getLocalStorage('summaryTimeType')

  const setSummaryTimeType = (type: SummaryTimeType) => {
    storageApi.setLocalStorage('summaryTimeType', type)
  }

  return {
    addRecentKeywords,
    getRecentKeywords,
    removeKeywords,

    readExpiredTodos,
    getReadExpiredTodo,
    addReadExpiredTodo,
    removeReadExpiredTodo,

    getSummaryTimeType,
    setSummaryTimeType,
  }
})
