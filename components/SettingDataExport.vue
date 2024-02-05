<template>
  <div class="flex | border-b | py-3">
    <label class="lg:w-60 | text-sm">{{ $t('Export') }}</label>
    <button
      class="ml-auto lg:ml-0 px-4 py-0.5 | bg-slate-800 | text-sm text-white | rounded-full"
      @click="exportData">
      {{ $t('Export') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { SavedData } from '~/models/SavedData';
import { useSettingStore } from '~/store/setting.store'
import { useTodoStore } from '~/store/todo.store'

const todoStore = useTodoStore()
const settingStore = useSettingStore()

const getSerializedData = () => {
  const data: SavedData = {
    todos: todoStore.todos,
    setting: settingStore.setting,
  }
  return JSON.parse(JSON.stringify(data))
}

const exportData = () => {
  const element = document.createElement('a')
  element.setAttribute(
    'href',
    `data:text/json;charset=utf-8, ${encodeURIComponent(
      JSON.stringify(getSerializedData())
    )}`
  )
  element.setAttribute('download', 'data.json')
  document.body.appendChild(element)

  element.click()
  document.body.removeChild(element)
}
</script>

<style></style>
