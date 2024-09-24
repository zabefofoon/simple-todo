<template>
  <div
    class="flex | py-3"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <label
      class="lg:w-60 | text-sm"
      :class="storageStore.getThemeClass('', 'text-white')">
      {{ i18n.t('SpreadsheetLink') }}
    </label>
    <button
      v-if="googleStore.googleAccessToken"
      class="ml-auto lg:ml-0 px-4 py-0.5 | text-sm text-white | rounded-full"
      name="Export"
      :class="storageStore.getThemeClass('bg-green-400', 'bg-green-600')"
      @click="googleStore.unLinkGoogle()">
      On
    </button>
    <button
      v-else
      class="ml-auto lg:ml-0 px-4 py-0.5 | bg-slate-800 | text-sm text-white | rounded-full"
      name="Export"
      @click="googleStore.openGoogleLoginPopup()">
      Off
    </button>
  </div>
</template>

<script setup lang="ts">
import { useGoogleStore } from '~/store/google.store'
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
const i18n = useI18n()
const googleStore = useGoogleStore()
</script>
