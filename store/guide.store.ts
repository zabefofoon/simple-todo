import { defineStore } from 'pinia'
import etcUtil from '~/utils/etc'

export const useGuideStore = defineStore(
  'guide',
  () => {
    false
    const isShowAddGuide = ref(false)
    const showAddGuide = (value: boolean) => (isShowAddGuide.value = value)

    const isShowAddHomeGuide = ref(false)
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
