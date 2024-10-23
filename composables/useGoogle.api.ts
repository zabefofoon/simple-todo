import type { ServerResponse } from '~/models/ServerResponse'
import type { Tag } from '~/models/Tag'
import type { Todo } from '~/models/Todo'
import { useGoogleStore } from '~/store/google.store'

export const useGoogleApi = () => {
  const googleStore = useGoogleStore()

  return {
    requestAccessToken2() {
      return $fetch('/api/auth/google')
    },

    getAllRows() {
      return $fetch<ServerResponse<Record<string, string>[]>>(
        '/api/spreadsheet/rows',
        {
          method: 'get',
          params: {
            sheetId: googleStore.spreadsheetId,
          },
          headers: {
            'x-google-refresh-token': googleStore.googleRefreshToken,
            'x-google-access-token': googleStore.googleAccessToken,
          },
        }
      )
    },

    createSpreadsheet2() {
      return $fetch('/api/spreadsheet/create', {
        method: 'post',
      })
    },

    updateRow2(index: number, todo: Partial<Todo>) {
      return $fetch('/api/spreadsheet/row', {
        method: 'put',
        body: {
          index,
          todo,
          sheetId: googleStore.spreadsheetId,
        },
        headers: {
          'x-google-refresh-token': googleStore.googleRefreshToken,
          'x-google-access-token': googleStore.googleAccessToken,
        },
      })
    },

    addRow2(todo: Partial<Todo>) {
      return $fetch('/api/spreadsheet/rows', {
        method: 'post',
        body: {
          todo,
          sheetId: googleStore.spreadsheetId,
        },
        headers: {
          'x-google-refresh-token': googleStore.googleRefreshToken,
          'x-google-access-token': googleStore.googleAccessToken,
        },
      })
    },

    deleteRow2(indexes: number[]) {
      console.log(indexes)
      return $fetch('/api/spreadsheet/row', {
        method: 'delete',
        body: {
          index: -111,
          indexes,
          sheetId: googleStore.spreadsheetId,
        },
        headers: {
          'x-google-refresh-token': googleStore.googleRefreshToken,
          'x-google-access-token': googleStore.googleAccessToken,
        },
      })
    },

    doneRow2(updates: { index: number; done: boolean }[]) {
      return $fetch('/api/spreadsheet/row/done', {
        method: 'put',
        body: {
          updates,
          sheetId: googleStore.spreadsheetId,
        },
        headers: {
          'x-google-refresh-token': googleStore.googleRefreshToken,
          'x-google-access-token': googleStore.googleAccessToken,
        },
      })
    },

    syncTags(tags: Tag[]) {
      return $fetch<ServerResponse<Tag[]>>('/api/spreadsheet/tags', {
        method: 'post',
        body: {
          tags,
          sheetId: googleStore.spreadsheetId,
        },
        headers: {
          'x-google-refresh-token': googleStore.googleRefreshToken,
          'x-google-access-token': googleStore.googleAccessToken,
        },
      })
    },
  }
}
