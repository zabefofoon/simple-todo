import type { Setting } from './Setting'
import type { Todo } from './Todo'

export type SavedData = {
  todos?: Todo[]
  setting?: Setting
}
