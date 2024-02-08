<template>
  <div
    class="flex | border-b | py-3"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <label
      class="lg:w-60 | text-sm"
      :class="storageStore.getThemeClass('', 'text-white')">
      {{ $t('Display') }}
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
        {{ $t('Thumbnail') }}
      </option>
      <option value="row" :class="storageStore.getThemeClass('', 'text-white')">
        {{ $t('Row') }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { Display } from '~/models/Setting'
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()

const changeDisplay = (event: Event) => {
  const value = <Display>(<HTMLSelectElement>event.target).value
  storageStore.setDisplay(value)
}
</script>

<style></style>
