import { defineStore } from 'pinia'
import storageApi from '~/api/storage.api'
import type { Display, Language, Theme } from '~/models/Setting'
import type { SummaryTimeType } from '~/models/Summary'
import { getCookie } from 'h3'
import { setCookie } from '~/utils/etc'
import { useTodoStore } from './todo.store'

export const useStorageStore = defineStore('storage', () => {
  const i18n = useI18n()
  const event = useRequestEvent()
  const todoStore = useTodoStore()

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

    readTodoIds = readTodoIds.filter((_, index) => index < 30)
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

  const setSummaryTimeType = (type: SummaryTimeType) =>
    storageApi.setLocalStorage('summaryTimeType', type)

  const language = ref<Theme>(
    process.client
      ? storageApi.getLocalStorage('language') || 'en'
      : getCookie(event, 'i18n_redirected') || 'en'
  )
  const setLanguage = (value: Language) => {
    storageApi.setLocalStorage('language', value)
    i18n.setLocale(value)
  }

  const theme = ref<Theme>(
    process.client
      ? storageApi.getLocalStorage('theme') || 'white'
      : getCookie(event, 'x-theme') || 'white'
  )
  const setTheme = (value: Theme) => {
    storageApi.setLocalStorage('theme', value)
    setCookie('x-theme', value, 30)
    theme.value = value
  }
  const getThemeClass = (whiteClass: string, darkClass: string) =>
    toValue(theme) === 'white' ? whiteClass : darkClass

  const display = ref<Display>(
    process.client
      ? storageApi.getLocalStorage('display') || 'thumbnail'
      : getCookie(event, 'x-display') || 'thumbnail'
  )
  const setDisplay = (value: Display) => {
    storageApi.setLocalStorage('display', value)
    setCookie('x-display', value, 30)
    display.value = value
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

    language,
    setLanguage,

    theme,
    setTheme,
    getThemeClass,

    display,
    setDisplay,
  }
})
