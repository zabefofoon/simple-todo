import { Menu } from '~/models/Menu'

const registHydrationModel = (key: string, classData: any) => {
  definePayloadReducer(key, (data) => {
    if (data instanceof classData) return deepClone(data)
  })
  definePayloadReviver(key, (data) => new classData(data))
}

export default definePayloadPlugin(() => {
  registHydrationModel('Menu', Menu)
})
