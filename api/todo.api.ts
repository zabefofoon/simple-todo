import { db } from '~/database/db'
import type { Todo } from '~/models/Todo'

export const getAllTodos = () => {
  return db.todos.toArray()
}

export const getTodo = (id: number) => {
  
  return db.todos.get(id)
}

export const addTodo = (todo: Todo) => {
  return db.todos.add(todo)
}

export const updateTodo = (itemId: number, updatedData: Partial<Todo>) => {
  return db.todos.update(itemId, updatedData)
}

export const deleteTodo = (itemId: number) => {
  return db.todos.delete(itemId)
}

export default { getAllTodos, getTodo, addTodo, updateTodo, deleteTodo }
