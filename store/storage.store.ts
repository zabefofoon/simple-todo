import { getCookie } from 'h3'
import { defineStore } from 'pinia'
import storageApi from '~/api/storage.api'
import type { Display, Language, Theme } from '~/models/Setting'
import type { SummaryTimeType } from '~/models/Summary'
import etcUtil from '~/utils/etc'

export const useStorageStore = defineStore(
  'storage',
  () => {
    const i18n = useI18n()
    const event = useRequestEvent()

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

    const getSummaryTimeType = () =>
      storageApi.getLocalStorage('summaryTimeType')

    const setSummaryTimeType = (type: SummaryTimeType) =>
      storageApi.setLocalStorage('summaryTimeType', type)

    const language = ref<Language>('en')
    const setLanguage = (value: Language) => {
      language.value = value
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

    const display = ref<Display>('thumbnail')
    const setDisplay = (value: Display) => (display.value = value)

    const getUniqueId = () => storageApi.getLocalStorage('mid')
    const setUniqueId = () => {
      const mid = etc.generateLongUniqueId()
      storageApi.setLocalStorage('mid', mid)
      return mid
    }

    const getCookiesAccepted = () =>
      storageApi.getLocalStorage('cookiesAccepted') === 'true'
    const setCookiesAccepted = () =>
      storageApi.setLocalStorage('cookiesAccepted', 'true')

    const isSNBExpanded = ref(true)
    const expandSNB = (value?: boolean) => {
      isSNBExpanded.value = value != null ? value : !isSNBExpanded.value
    }
    return {
      addRecentKeywords,
      getRecentKeywords,
      removeKeywords,

      getSummaryTimeType,
      setSummaryTimeType,

      language,
      setLanguage,

      theme,
      setTheme,
      getThemeClass,

      display,
      setDisplay,

      getUniqueId,
      setUniqueId,

      getCookiesAccepted,
      setCookiesAccepted,

      isSNBExpanded,
      expandSNB,
    }
  },
  {
    persist: {
      paths: ['language', 'display', 'isSNBExpanded'],
      storage: persistedState.cookiesWithOptions({
        expires: etcUtil.getCookieExpires(),
      }),
    },
  }
)
