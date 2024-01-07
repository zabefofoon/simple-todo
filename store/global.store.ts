import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
  const savedScrollTop = ref(0)
  const saveScrollTop = (value: number) => (savedScrollTop.value = value)

  return {
    savedScrollTop,
    saveScrollTop,
  }
})
