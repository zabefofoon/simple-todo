import type { Todo } from '~/models/Todo'
import { db } from '~/plugins/dexie.client'

export const getAllTodos = () => {
  return db!.todos.toArray()
}

export const getTodo = (id: number) => {
  return db!.todos.get(id)
}

export const addTodo = (todo: Todo) => {
  return db!.todos.add(todo)
}

export const updateTodo = (itemId: number, updatedData: Partial<Todo>) => {
  return db!.todos.update(itemId, updatedData)
}

export const updateBulkTodos = async (
  ids: number[],
  updatedData: Partial<Todo>
) => {
  const arr = await db!.todos.bulkGet(ids)
  return arr.forEach((todo) => db!.todos.update(todo!.id!, updatedData))
}

export const bulkAdd = (todos: Todo[]) => {
  return db!.todos.bulkAdd(todos)
}

export const deleteTodo = (itemId: number) => {
  return db!.todos.delete(itemId)
}

export const deleteBulkTodos = (itemIds: number[]) => {
  return db!.todos.bulkDelete(itemIds)
}

export default {
  getAllTodos,
  getTodo,
  addTodo,
  updateTodo,
  bulkAdd,
  deleteTodo,
  updateBulkTodos,
  deleteBulkTodos
}
