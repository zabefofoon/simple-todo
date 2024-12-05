<template>
  <div class="flex | py-3">
    <label
      class="lg:w-60 | text-sm"
      :class="storageStore.getThemeClass('', 'text-white')">
      <span v-t="'Import'"></span>
    </label>
    <button
      class="ml-auto lg:ml-0 px-4 py-0.5 | bg-slate-800 | text-sm text-white | rounded-full"
      name="Import"
      @click="importData">
      <span v-t="'Import'"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { SavedData } from '~/models/SavedData'

const todoStore = useTodoStore()
const settingStore = useSettingStore()
const storageStore = useStorageStore()

const i18n = useI18n()
const importData = () => {
  const element = document.createElement('input')
  element.setAttribute('type', 'file')
  element.click()
  document.body.appendChild(element)
  element.onchange = (event: Event) => {
    if (!confirm(i18n.t('ConfirmImport'))) return

    const fileReader = new FileReader()
    const file = (<HTMLInputElement>event.target).files?.[0]

    if (!file) return
    fileReader.readAsText(file, 'utf-8')
    fileReader.onload = async () => {
      const result = <SavedData>JSON.parse(`${fileReader.result}`)
      await sleep(200)
      todoStore.importTodos(result.todos || [])
      settingStore.importSetting(result.setting!)
    }
  }
  document.body.removeChild(element)
}
</script>
