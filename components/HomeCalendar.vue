<template>
  <div
    class="h-fit | flex flex-col gap-2 | flex-shrink-0 | lg:min-w-[300px] lg:w-[25vw] | p-2 lg:p-3 | border rounded-lg"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <NuxtLink
      to="calender"
      :class="storageStore.getThemeClass('', 'text-white')"
      area-label="Calendar"
      class="font-bold">
      {{ i18n.t('Calender') }}
    </NuxtLink>
    <Calendar />
  </div>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
const i18n = useI18n()
</script>
