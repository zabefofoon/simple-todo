import { defineStore } from 'pinia'

export const useScrollStore = defineStore('scroll', () => {
  const scrollLocked = ref(false)
  const lockScroll = (value?: boolean) => scrollLocked.value = value || false

  const savedScrollTop = ref(0)
  const saveScrollTop = (value: number) => (savedScrollTop.value = value)

  return {
    scrollLocked,
    lockScroll,

    savedScrollTop,
    saveScrollTop,
  }
})
