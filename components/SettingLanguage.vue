<template>
  <div class="flex | border-b border-theme | py-3">
    <label class="lg:w-60 | text-sm text-theme" v-t="'Language'"> </label>
    <select
      v-model="i18n.locale.value"
      class="ml-auto lg:ml-0 | text-sm text-theme | bg-theme-3"
      :class="storageStore.getThemeClass('', 'dark')"
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
