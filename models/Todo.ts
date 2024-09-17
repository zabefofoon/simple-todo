import { useSettingStore } from '~/store/setting.store'

export class Todo {
  id?: number
  upto?: boolean
  date?: string
  description?: string
  tagId?: string
  time?: string
  created?: number
  done?: boolean
  modified?: number
  images?: string[]

  constructor(todo: Partial<Todo>) {
    Object.assign(this, todo)
    if (!todo.created) this.created = new Date().getTime()
  }

  get createdDate() {
    const currentDate = new Date(this.created || '')
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')

    return year + '-' + month + '-' + day
  }

  get uptoTime() {
    return this.upto
      ? new Date(`${this.date!} ${this.time}`).getTime()
      : undefined
  }

  get expired() {
    return this.uptoTime ? new Date().getTime() > this.uptoTime : false
  }

  get tag() {
    const settingStore = useSettingStore()

    return settingStore.setting?.tags.find((tag) => tag.id === this.tagId)
  }

  static of(todo: Partial<Todo>) {
    return new Todo(todo)
  }

  static map(todos: Partial<Todo>[]) {
    return todos.map(Todo.of)
  }
}
