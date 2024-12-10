// db.ts
import type { Table } from 'dexie'
import Dexie from 'dexie'
import type { Setting } from '~/models/Setting'
import { Todo } from '~/models/Todo'

export class MySubClassedDexie extends Dexie {
  todos!: Table<Todo>
  setting!: Table<Setting>
  images!: Table<{ id?: number; image: string | Blob; todoId: number }> // 새로운 이미지 테이블 타입 정의

  constructor() {
    super('SimpleTodo')
    // 스키마 정의
    this.version(1.4).stores({
      todos:
        '++id, date, description, tagId, time, created, upto, done, modified', // images 필드 제거
      setting: '++id, tags, forms',
      images: '++id, image, todoId', // 새로운 image 테이블 추가
    })

    // 데이터 마이그레이션
    this.version(1.4).upgrade(async (tx) => {
      const todos = await tx.table('todos').toArray()
      const imageTable = tx.table('images')

      // todos 테이블에서 images 데이터를 분리하여 새로운 테이블에 삽입
      for (const todo of todos) {
        if (todo.images) {
          for (const image of todo.images) {
            await imageTable.add({ image, todoId: todo.id }) // todoId로 연결
          }
        }
        delete todo.images // 기존 테이블에서 images 필드 제거
        await tx.table('todos').put(todo)
      }
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
