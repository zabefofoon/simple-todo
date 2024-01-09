// db.ts
import type { Table } from 'dexie'
import Dexie from 'dexie'
import {Todo} from '~/models/Todo'

export class MySubClassedDexie extends Dexie {
  todos!: Table<Todo>

  constructor() {
    super('SimpleTodo')
    this.version(1).stores({
      todos: '++id, date, description, tags, time, created, upto, done',
    })
  }
}

export const db = new MySubClassedDexie()
