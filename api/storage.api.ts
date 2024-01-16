import store from 'store2'

export const getLocalStorage = (key: string) => store.local.get(key)

export const setLocalStorage = (key: string, data: string) => store.local.set(key, data)

export default {
    getLocalStorage,
    setLocalStorage
}
