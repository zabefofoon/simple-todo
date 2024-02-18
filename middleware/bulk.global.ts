import { useBulkStore } from '~/store/bulk.store'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const bulkStore = useBulkStore()

    if (from.query.bulk) {
      if (to.name === 'todo-id') return abortNavigation()

      if (!to.query.bulk) bulkStore.emptyTodoIds()
    }
  }
})
