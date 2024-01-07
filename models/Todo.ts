import { generateUniqueId } from '~/utils/etc'
import { Tag } from './Tag'

export class Todo {
  id?: string
  date?: string
  description?: string
  tags: Tag[] = []
  time?: string
  title?: string

  constructor(todo: Partial<Todo>) {
    Object.assign(this, todo)
    this.id = generateUniqueId()
  }

  static of(todo: Partial<Todo>) {
    return new Todo(todo)
  }
}
