import { defineStore } from 'pinia'
import etcUtil from '~/utils/etc'

export const useGuideStore = defineStore(
  'guide',
  () => {
    const isShowAddGuide = ref(true)
    const showAddGuide = (value: boolean) => (isShowAddGuide.value = value)

    const isShowAddHomeGuide = ref(true)
    const showAddHomeGuide = (value: boolean) => {
      isShowAddHomeGuide.value = value
    }

    return {
      isShowAddGuide,
      showAddGuide,

      isShowAddHomeGuide,
      showAddHomeGuide,
    }
  },
  {
    persist: {
      paths: ['isShowAddGuide', 'isShowAddHomeGuide'],
      storage: persistedState.cookiesWithOptions({
        expires: etcUtil.getCookieExpiresNYears(10),
      }),
    },
  }
)
