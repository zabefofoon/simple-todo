<template>
  <div class="flex | border-b border-theme | py-3">
    <label class="lg:w-60 | text-sm text-theme" v-t="'Export'"> </label>
    <button
      class="ml-auto lg:ml-0 px-4 py-0.5 | bg-slate-800 | text-sm text-white | rounded-full"
      name="Export"
      @click="exportData"
      v-t="'Export'"></button>
  </div>
</template>

<script setup lang="ts">
import type { SavedData } from '~/models/SavedData'

const todoStore = useTodoStore()
const settingStore = useSettingStore()

const getSerializedData = () => {
  const data: SavedData = {
    todos: todoStore.todos?.filter((todo) => !todo.linked),
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
