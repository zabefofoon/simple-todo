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

export const getTodo = (id: string) => {
  try {
    const _id = isNaN(+id) ? id : +id
    return db!.todos.get(_id)
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

export const updateTodo = (id: string, updatedData: Partial<Todo>) => {
  try {
    const _id = isNaN(+id) ? id : +id
    return db!.todos.update(_id, updatedData)
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
}

export const updateBulkTodos = async (
  ids: string[],
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

export const deleteTodo = (id: string) => {
  const _id = isNaN(+id) ? id : +id
  try {
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
  return db!.todos.delete(_id)
}

export const deleteBulkTodos = (ids: string[]) => {
  const _ids = ids.map((id) => (isNaN(+id) ? id : +id))
  try {
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
  db!.todos.bulkDelete(_ids)
  return _ids
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
