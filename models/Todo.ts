import dayjs from 'dayjs'

export class Todo {
  id?: string
  upto?: boolean
  date?: string
  description?: string
  tagId?: string
  time?: string
  created?: number
  done?: boolean
  modified?: number
  images?: (string | Blob)[]
  linked?: 'google'

  constructor(todo: Partial<Todo>) {
    Object.assign(this, todo)
    if (!todo.created) this.created = new Date().getTime()
  }

  get createdDate() {
    return dayjs(this.created).format('YYYY-MM-DD')
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

  get leftUptoHour() {
    const targetTime = new Date(`${this.date!} ${this.time}`).getTime()
    const currentTime = new Date().getTime()
    const timeDiff = targetTime - currentTime
    return Math.round(timeDiff / (1000 * 60 * 60))
  }

  get leftUptoMinute() {
    const targetTime = new Date(`${this.date!} ${this.time}`).getTime()
    const currentTime = new Date().getTime()
    const timeDiff = targetTime - currentTime
    return Math.round(timeDiff / (1000 * 60))
  }

  toggleDone(value?: boolean) {
    this.done = value != null ? value : !this.done
  }

  static of(todo: Partial<Todo>) {
    return new Todo(todo)
  }

  static map(todos: Partial<Todo>[]) {
    return todos.map(Todo.of)
  }

  static spreadsheetOf(sheetRow: Record<string, string>) {
    return Todo.of({
      id: sheetRow.id,
      upto: sheetRow.upto === 'true',
      date: sheetRow.date,
      description: sheetRow.description || '',
      tagId: sheetRow.tagId ? sheetRow.tagId : undefined,
      time: sheetRow.time,
      created: sheetRow.created ? +sheetRow.created : undefined,
      done: sheetRow.done.toLowerCase() === 'true',
      modified: sheetRow.modified ? +sheetRow.modified : undefined,
      images: sheetRow.images ? sheetRow.images.split(',') : undefined,
      linked: sheetRow.linked ? 'google' : undefined,
    })
  }

  static createToSpreadsheet(todo: Partial<Todo>) {
    return [
      todo.id?.toString() || '',
      todo.upto?.toString() || '',
      todo.date?.toString() || '',
      todo.description?.toString() || '',
      todo.tagId?.toString() || '',
      todo.time?.toString() || '',
      todo.created?.toString() || '',
      todo.done?.toString() || '',
      todo.modified?.toString() || '',
      todo.images?.toString() || '',
      todo.linked?.toString() || '',
    ]
  }
}
