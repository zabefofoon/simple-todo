import { defineStore } from 'pinia'

export const useGuideStore = defineStore(
  'guide',
  () => {
    const isShowAddGuide = ref(true)
    const showAddGuide = (value: boolean) => (isShowAddGuide.value = value)

    const isShowAddHomeGuide = ref(true)
    const showAddHomeGuide = (value: boolean) => {
        isShowAddHomeGuide.value = value
        console.log(value)
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
    },
  }
)
