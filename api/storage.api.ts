import store from 'store2'

export const getLocalStorage = (key: string) => {
  try {
    return store.local.get(key)
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
    return undefined
  }
}

export const setLocalStorage = (key: string, data: string) => {
  try {
    store.local.set(key, data)
  } catch {
    alert(useI18n().t('BrowserNotice'))
  }
}

export default {
  getLocalStorage,
  setLocalStorage,
}
