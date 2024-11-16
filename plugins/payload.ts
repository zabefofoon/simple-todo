import { Menu } from '~/models/Menu'
import { Paginated } from '~/models/Paginated'
import { Post, PostBrief } from '~/models/Post'

const registHydrationModel = (key: string, classData: any) => {
  definePayloadReducer(key, (data) => {
    if (data instanceof classData) return deepClone(data)
  })
  definePayloadReviver(key, (data) => new classData(data))
}

export default definePayloadPlugin(() => {
  registHydrationModel('Menu', Menu)
  registHydrationModel('PostBrief', PostBrief)
  registHydrationModel('Post', Post)
  registHydrationModel('Paginated', Paginated)
})
