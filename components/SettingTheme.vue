<template>
  <div
    class="flex | border-b | py-3"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <label
      class="lg:w-60 | text-sm"
      :class="storageStore.getThemeClass('', 'text-white')"
      v-t="'Theme'">
    </label>
    <select
      v-model="storageStore.theme"
      class="ml-auto lg:ml-0 | text-sm"
      :class="
        storageStore.getThemeClass('bg-white', 'dark | bg-slate-900 text-white')
      "
      @change="changeTheme">
      <option value="white" v-t="'White'"></option>
      <option value="dark" v-t="'Dark'"></option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { Theme } from '~/models/Setting'

const storageStore = useStorageStore()

const changeTheme = (event: Event) => {
  const value = <Theme>(<HTMLSelectElement>event.target).value
  storageStore.setTheme(value)
}
</script>
