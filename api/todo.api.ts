import type { Todo } from '~/models/Todo'
import { db } from '~/plugins/dexie.client'

export const getAllTodos = async (): Promise<Omit<Todo, 'images'>[]> => {
  if (!db) {
    alert(useI18n().t('BrowserNotice'))
    return []
  }

  try {
    return await db.todos.toArray()
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
    console.error(e)
    return []
  }
}

export const getTodo = async (id: string) => {
  try {
    const _id = isNaN(+id) ? id : +id
    const todo = await db!.todos.get(_id)
    const images = await db!.images.where('todoId').equals(_id).toArray()
    if (todo) {
      todo.images = images.map((image) => image.image) ?? []
    }
    return todo
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
}

export const addTodo = async (todo: Todo) => {
  try {
    const added = await db!.todos.add(todo)
    const images =
      todo.images?.map((image) => ({
        image,
        todoId: added as number,
      })) ?? []

    return db!.images.bulkAdd(images)
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
}

export const updateTodo = async (id: string, updatedData: Partial<Todo>) => {
  try {
    const _id = isNaN(+id) ? id : +id

    const images =
      updatedData.images?.map((image) => ({
        image,
        todoId: _id,
      })) ?? []
    await db!.todos.update(_id, updatedData)
    await db.images.where('todoId').equals(_id).delete()
    return db!.images.bulkAdd(images)
  } catch (e) {
    console.log(e)
    alert(useI18n().t('BrowserNotice'))
  }
}

export const updateBulkTodos = async (
  ids: string[],
  updatedData: Partial<Todo>,
) => {
  try {
    const arr = await db!.todos.bulkGet(ids)
    return arr.forEach((todo) => db!.todos.update(todo!.id!, updatedData))
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
}

export const bulkAdd = async (todos: Todo[]) => {
  try {
    await db!.transaction('rw', db!.todos, db!.images, async () => {
      for (const todo of todos) {
        const id = await db!.todos.add(todo)
        if (todo.images) {
          await db!.images.bulkAdd(
            todo.images.map((image) => ({
              todoId: id as number,
              image,
            })),
          )
        }
      }
    })
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
    throw e
  }
}

export const deleteTodo = (id: string) => {
  const _id = isNaN(+id) ? id : +id
  try {
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
  db.images.where('todoId').equals(_id).delete()
  return db!.todos.delete(_id)
}

export const deleteBulkTodos = (ids: string[]) => {
  const _ids = ids.map((id) => (isNaN(+id) ? id : +id))
  try {
  } catch (e) {
    alert(useI18n().t('BrowserNotice'))
  }
  db!.todos.bulkDelete(_ids)
  for (const todoId of _ids) {
    db.images.where('todoId').equals(todoId).delete()
  }
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
