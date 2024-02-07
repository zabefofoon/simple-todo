<template>
  <div class="flex | border-b | py-3">
    <label class="lg:w-60 | text-sm">{{ $t('Language') }}</label>
    <select
        :value="storageStore.getLanguage()"
        class="ml-auto lg:ml-0 | bg-white | text-sm"
        @change="changeLanguage">
        <option value="en">{{ $t('English') }}</option>
        <option value="ko">{{ $t('Korean') }}</option>
      </select>
  </div>
</template>

<script setup lang="ts">
import type { Language } from '~/models/Setting'
import { useStorageStore } from '~/store/storage.store'

const i18n = useI18n()

const storageStore = useStorageStore()

const changeLanguage = (event: Event) => {
  const value = <Language>(<HTMLSelectElement>event.target).value
  i18n.setLocale(value)
  storageStore.setLanguage(value)
}
</script>

<style></style>
