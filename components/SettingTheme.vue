<template>
  <div class="flex | border-b | py-3">
    <label class="lg:w-60 | text-sm">{{ $t('Theme') }}</label>
    <select
      v-model="storageStore.theme"
      class="ml-auto lg:ml-0 | bg-white | text-sm"
      @change="changeTheme">
      <option value="white">{{ $t('White') }}</option>
      <option value="dark">{{ $t('Dark') }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { Theme } from '~/models/Setting'
import { useStorageStore } from '~/store/storage.store'
import { setCookie } from '~/utils/etc'

const storageStore = useStorageStore()

const changeTheme = (event: Event) => {
  const value = <Theme>(<HTMLSelectElement>event.target).value
  storageStore.setTheme(value)
}
</script>

<style></style>
