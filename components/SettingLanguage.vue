<template>
  <div
    class="flex | border-b | py-3"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <label
      class="lg:w-60 | text-sm"
      :class="storageStore.getThemeClass('', 'text-white')">
      {{ $t('Language') }}
    </label>
    <select
      :value="storageStore.language"
      class="ml-auto lg:ml-0 | text-sm"
      :class="
        storageStore.getThemeClass('bg-white', 'dark | bg-slate-900 text-white')
      "
      @change="changeLanguage">
      <option value="en" :class="storageStore.getThemeClass('', 'text-white')">
        {{ $t('English') }}
      </option>
      <option value="ko" :class="storageStore.getThemeClass('', 'text-white')">
        {{ $t('Korean') }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { Language } from '~/models/Setting'
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()

const changeLanguage = (event: Event) => {
  const value = <Language>(<HTMLSelectElement>event.target).value
  storageStore.setLanguage(value)
}
</script>

<style></style>
