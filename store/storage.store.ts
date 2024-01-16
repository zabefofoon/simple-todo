import { defineStore } from 'pinia'
import storageApi from '~/api/storage.api'

export const useStorageStore = defineStore('storage', () => {
  const getLocalStorage = (key: string) => storageApi.getLocalStorage(key)

  const setLocalStorage = (key: string, data: string) =>
    storageApi.setLocalStorage(key, data)

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

  return {
    getLocalStorage,
    setLocalStorage,

    addRecentKeywords,
    getRecentKeywords,
    removeKeywords,
  }
})
