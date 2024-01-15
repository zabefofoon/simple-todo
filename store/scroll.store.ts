import { defineStore } from 'pinia'
import { sleep } from '~/utils/etc'

export const useScrollStore = defineStore('scroll', () => {
  const router = useRouter()

  const scrollLocked = ref(false)
  const lockScroll = (value?: boolean) => (scrollLocked.value = value || false)

  const savedScrollTop = ref(0)
  const saveScrollTop = (value: number) => (savedScrollTop.value = value)

  const temp = ref(false)

  const listenHistoryUpdate = () => {
    const scrollTo = () =>
      document
        .getElementById('scroll-area')
        ?.scrollTo({ top: toValue(savedScrollTop) })

    router.options.history.listen(async () => {
      temp.value = true
      await sleep(100)
      temp.value = false
    })

    router.beforeResolve((to, from, next) => {
      !toValue(temp)
        ? saveScrollTop(document.getElementById('scroll-area')?.scrollTop || 0)
        : setTimeout(scrollTo, 50)
      next()
    })
  }

  return {
    temp,

    scrollLocked,
    lockScroll,

    savedScrollTop,
    saveScrollTop,

    listenHistoryUpdate,
  }
})
