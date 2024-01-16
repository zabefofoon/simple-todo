import { defineStore } from 'pinia'
import { sleep } from '~/utils/etc'

export const useScrollStore = defineStore('scroll', () => {
  const router = useRouter()

  const scrollLocked = ref(false)
  const lockScroll = (value?: boolean) => (scrollLocked.value = value || false)

  const savedScrollTop = ref(0)
  const saveScrollTop = (value: number) => (savedScrollTop.value = value)

  const tempHistoryMoved = ref(false)
  const setTempHistoryMoved = (value: boolean) => tempHistoryMoved.value = value

  const listenHistoryUpdate = () => {
    const scrollTo = () =>
      document
        .getElementById('scroll-area')
        ?.scrollTo({ top: toValue(savedScrollTop) })

    router.options.history.listen(async () => {
      setTempHistoryMoved(true)
      await sleep(100)
      setTempHistoryMoved(false)
    })

    router.beforeResolve((to, from, next) => {
      !toValue(tempHistoryMoved)
        ? saveScrollTop(document.getElementById('scroll-area')?.scrollTop || 0)
        : setTimeout(scrollTo, 50)
      next()
    })
  }

  return {
    tempHistoryMoved,

    scrollLocked,
    lockScroll,

    savedScrollTop,
    saveScrollTop,

    listenHistoryUpdate,
  }
})
