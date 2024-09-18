import type { Todo } from '~/models/Todo'
import { db } from '~/plugins/dexie.client'

export const getAllTodos = () => {
  try {
    return db!.todos
      .toCollection()
      .primaryKeys()
      .then((keys) => {
        return db!.todos
          .where('id')
          .anyOf(keys)
          .filter((todo) => delete todo.images)
          .toArray()
      })
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
}

export const getTodo = (id: number) => {
  try {
    return db!.todos.get(id)
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
}

export const addTodo = (todo: Todo) => {
  try {
    return db!.todos.add(todo)
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
}

export const updateTodo = (itemId: number, updatedData: Partial<Todo>) => {
  try {
    return db!.todos.update(itemId, updatedData)
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
}

export const updateBulkTodos = async (
  ids: number[],
  updatedData: Partial<Todo>
) => {
  try {
    const arr = await db!.todos.bulkGet(ids)
    return arr.forEach((todo) => db!.todos.update(todo!.id!, updatedData))
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
}

export const bulkAdd = (todos: Todo[]) => {
  try {
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
  return db!.todos.bulkAdd(todos)
}

export const deleteTodo = (itemId: number) => {
  try {
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
  return db!.todos.delete(itemId)
}

export const deleteBulkTodos = (itemIds: number[]) => {
  try {
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
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
  deleteBulkTodos,
}
