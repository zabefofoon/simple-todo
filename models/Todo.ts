import { Tag } from './Tag'

export class Todo {
  id?: number
  upto?: boolean
  date?: string
  description?: string
  tags: Tag[] = []
  time?: string
  created?: number
  done?: boolean

  constructor(todo: Partial<Todo>) {
    Object.assign(this, todo)
    if (!todo.created) this.created = new Date().getTime()
  }

  get createdDate() {
    const currentDate = new Date(this.created)
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')

    return year + '-' + month + '-' + day
  }

  static of(todo: Partial<Todo>) {
    return new Todo(todo)
  }

  static map(todos: Partial<Todo>[]) {
    return todos.map(Todo.of)
  }
}
