<template>
  <div class="flex | border-b | py-3">
    <label class="lg:w-60 | text-sm">{{ $t('Display') }}</label>
    <select
      :value="storageStore.display"
      class="ml-auto lg:ml-0 | bg-white | text-sm"
      @change="changeDisplay">
      <option value="thumbnail">{{ $t('Thumbnail') }}</option>
      <option value="row">{{ $t('Row') }}</option>
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
