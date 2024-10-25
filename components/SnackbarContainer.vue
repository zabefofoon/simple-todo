<template>
  <div
    class="fixed top-4 left-1/2 -translate-x-1/2 z-50 | flex flex-col gap-4 items-center | w-full | pointer-events-none">
    <TransitionGroup name="snackbar">
      <div
        v-for="snackbar in snackbarStore.snackbars"
        :key="snackbar.message"
        class="flex items-center gap-2 | pr-10 pl-8 py-2 | shadow-lg | border rounded-lg | transition-all"
        :class="[...getSnackbarClassByType(snackbar)]">
        <i
          class="icon | text-lg"
          :class="[...getSnackbarIconClassByType(snackbar)]"></i>
        <span class="text-xs">
          {{ snackbar.message }}
        </span>
      </div>
    </TransitionGroup>
  </div>
</template>
<script lang="ts" setup>
import type { Snackbar } from '~/models/Snackbar'
import { useSnackbarStore } from '~/store/snackbar.store'
const snackbarStore = useSnackbarStore()

const getSnackbarClassByType = ({ type }: Snackbar) => {
  switch (type) {
    case 'info':
      return ['bg-black', 'border-black', 'text-white']
    case 'error':
      return ['bg-red-50', 'border-red-200', 'text-red-400']
    case 'success':
      return ['bg-green-50', 'border-green-200', 'text-green-400']
    default:
      return []
  }
}

const getSnackbarIconClassByType = ({ type }: Snackbar): string[] => {
  switch (type) {
    case 'info':
      return ['icon-info']
    case 'error':
      return ['icon-warn']
    case 'success':
      return ['icon-check']
    default:
      return []
  }
}
</script>
