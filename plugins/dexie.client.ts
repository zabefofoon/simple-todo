// db.ts
import type { Table } from 'dexie'
import Dexie from 'dexie'
import type { Setting } from '~/models/Setting'
import { Todo } from '~/models/Todo'

export class MySubClassedDexie extends Dexie {
  todos!: Table<Todo>
  setting!: Table<Setting>

  constructor() {
    super('SimpleTodo')
    this.version(1.2).stores({
      todos:
        '++id, date, description, tagId, time, created, upto, done, modified, images',
      setting: '++id, tags, forms',
    })
  }
}

export const db = import.meta.client ? new MySubClassedDexie() : null

export default defineNuxtPlugin(() => {
  return {
    provide: {
      db,
    },
  }
})
