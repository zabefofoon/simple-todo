<template>
  <div
    class="flex | border-b | py-3"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <label
      class="lg:w-60 | text-sm"
      :class="storageStore.getThemeClass('', 'text-white')">
      {{ i18n.t('Display') }}
    </label>
    <select
      v-model="storageStore.display"
      class="ml-auto lg:ml-0 | text-sm"
      :class="
        storageStore.getThemeClass('bg-white', 'dark | bg-slate-900 text-white')
      "
      @change="changeDisplay">
      <option
        value="thumbnail"
        :class="storageStore.getThemeClass('', 'text-white')">
        {{ i18n.t('Thumbnail') }}
      </option>
      <option value="row" :class="storageStore.getThemeClass('', 'text-white')">
        {{ i18n.t('Row') }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { Display } from '~/models/Setting'

const storageStore = useStorageStore()
const i18n = useI18n()

const changeDisplay = (event: Event) => {
  const value = <Display>(<HTMLSelectElement>event.target).value
  storageStore.setDisplay(value)
}
</script>
