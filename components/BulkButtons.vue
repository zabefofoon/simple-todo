<template>
  <div class="fixed bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 z-[1001]">
    <ul
      class="flex items-center gap-1 lg:gap-3 | py-3 px-3 lg:px-4 | bg-slate-950 | rounded-full">
      <li>
        <button class="flex items-center gap-1" @click="router.back()">
          <i class="icon icon-arrow-left | text-white"></i>
          <span class="text-xs lg:text-sm | text-white whitespace-nowrap">
            {{ i18n.t('Close') }}
          </span>
        </button>
      </li>
      <span class="text-xs">|</span>
      <li>
        <button class="flex items-center gap-1.5" @click="bulkDone(true)">
          <span
            class="flex items-center justify-center | bg-green-500 | w-4 h-4 | rounded-full">
            <i class="icon icon-check | text-white"></i>
          </span>
          <span class="text-xs lg:text-sm | text-white whitespace-nowrap">
            {{ i18n.t('Done') }}
          </span>
        </button>
      </li>
      <span class="text-xs">|</span>
      <li>
        <button class="flex items-center gap-1.5" @click="bulkDone(false)">
          <span
            class="flex items-center justify-center | border border-slate-500 | w-4 h-4 | rounded-full">
            <i class="icon icon-check | text-white"></i>
          </span>
          <span class="text-xs lg:text-sm | text-white whitespace-nowrap">
            {{ i18n.t('Undone') }}
          </span>
        </button>
      </li>
      <span class="text-xs">|</span>
      <li>
        <button class="flex items-center gap-1" @click="bulkDelete()">
          <i class="icon icon-close | text-white"></i>
          <span class="text-xs lg:text-sm | text-white whitespace-nowrap">
            {{ i18n.t('Remove') }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useBulkStore } from '~/store/bulk.store'
import { useTodoStore } from '~/store/todo.store'

const i18n = useI18n()

const router = useRouter()
const bulkStore = useBulkStore()
const todoStore = useTodoStore()

const bulkDone = async (done?: boolean) => {
  if (confirm(i18n.t('bulkDone'))) {
    await bulkStore.updateBulkTodos(done)
    await todoStore.getAllTodos()
    router.back()
  }
}
const bulkDelete = async () => {
  if (confirm(i18n.t('bulkDone'))) {
    await bulkStore.deleteBulkTodos()
    await todoStore.getAllTodos()
    router.back()
  }
}
</script>
