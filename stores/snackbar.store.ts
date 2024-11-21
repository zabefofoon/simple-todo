import debounce from 'lodash.debounce'
import type { Snackbar } from '~/models/Snackbar'

export const useSnackbarStore = defineStore('snackbar', () => {
  const snackbars = ref<Snackbar[]>([])

  const showSnackbar = debounce((snackbar: Snackbar): void => {
    snackbars.value.push(snackbar)
    setTimeout(() => snackbars.value.splice(0, 1), 3000)
  }, 50)

  return { snackbars, showSnackbar }
})
