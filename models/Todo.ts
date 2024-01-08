import { Tag } from './Tag'

export class Todo {
  id?: number
  upto?: boolean
  date?: string
  description?: string
  tags: Tag[] = []
  time?: string
  title?: string
  created?: number

  constructor(todo: Partial<Todo>) {
    Object.assign(this, todo)
    this.created = new Date().getTime()
  }

  static of(todo: Partial<Todo>) {
    return new Todo(todo)
  }

  static map(todos: Partial<Todo>[]) {
    return todos.map(Todo.of)
  }
}
