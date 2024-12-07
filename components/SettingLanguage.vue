<template>
  <div
    class="flex | border-b | py-3"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <label
      class="lg:w-60 | text-sm"
      :class="storageStore.getThemeClass('', 'text-white')"
      v-t="'Language'">
    </label>
    <select
      v-model="i18n.locale.value"
      class="ml-auto lg:ml-0 | text-sm"
      :class="
        storageStore.getThemeClass('bg-white', 'dark | bg-slate-900 text-white')
      "
      @change="changeLanguage">
      <option value="en">English</option>
      <option value="ko">한국어</option>
      <option value="ja">日本語</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { Language } from '~/models/Setting'

const storageStore = useStorageStore()
const i18n = useI18n()

const changeLanguage = (event: Event) => {
  const value = <Language>(<HTMLSelectElement>event.target).value
  storageStore.setLanguage(value)
}
</script>
