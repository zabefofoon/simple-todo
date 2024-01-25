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
    this.version(1).stores({
      todos:
        '++id, date, description, tagId, time, created, upto, done, modified',
      setting: '++id, theme, language, tags, forms, display',
    })
  }
}

export const db = process.client ? new MySubClassedDexie() : null

export default defineNuxtPlugin((nuxtApp) => {
  
  return {
    provide: {
      db
    }
  }

})