import { getCookie } from 'h3'
import { defineStore } from 'pinia'
import storageApi from '~/api/storage.api'
import type { Language, Theme } from '~/models/Setting'
import type { SummaryTimeType } from '~/models/Summary'
import etcUtil from '~/utils/etc'

export const useStorageStore = defineStore(
  'storage',
  () => {
    const i18n = useI18n()
    const event = useRequestEvent()
    const localePath = useLocalePath()
    const route = useRoute()
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

    const language = ref<Language>(i18n.locale.value as Language)
    const setLanguage = (value: Language) => {
      language.value = value
      navigateTo(localePath(route.fullPath, value), { replace: true })
    }

    const theme = ref<Theme>(
      import.meta.client
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
        expires: etcUtil.getCookieExpiresNYears(10),
      }),
    },
  }
)
