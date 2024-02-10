<template>
  <div
    class="flex flex-col gap-2 | flex-shrink-0 | lg:min-w-[300px] lg:w-[25vw] | p-2 lg:p-3 | border rounded-lg"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <div class="font-bold">
      <NuxtLink
        to="calender"
        :class="storageStore.getThemeClass('', 'text-white')"
        area-label="Calendar">
        {{ $t('Calender') }}
      </NuxtLink>
    </div>
    <Calendar />
  </div>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
</script>
