<template>
  <div
    class="flex flex-col gap-2 | w-full min-w-[200px] | border rounded-lg | p-2 lg:p-3"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <div class="flex items-center">
      <Skeletor v-if="loadingStore.todoLoading" class="w-1/4 h-[24px]" />
      <template v-else>
        <span
          v-if="selectedOption === 'month'"
          class="font-bold"
          :class="storageStore.getThemeClass('', 'text-white')">
          {{ $t('Years') }}
        </span>
        <span
          v-else
          class="font-bold"
          :class="storageStore.getThemeClass('', 'text-white')">
          {{ $t('Weeks') }}
        </span>
        <select
          :value="selectedOption"
          class="ml-auto | text-sm"
          :class="storageStore.getThemeClass('bg-white', 'dark text-white')"
          @change="selectOption">
          <option value="month">{{ $t('Month') }}</option>
          <option value="week">{{ $t('Week') }}</option>
        </select>
      </template>
    </div>
    <div
      v-if="loadingStore.todoLoading"
      class="w-full aspect-video lg:aspect-square | flex items-center justify-center">
      <Spinner class="m-auto" />
    </div>
    <template v-else>
      <SummaryTimeYear v-if="selectedOption === 'month'" />
      <SummaryTimeMonth v-else />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { SummaryTimeType } from '~/models/Summary'
import { useLoadingStore } from '~/store/loading.store'
import { useStorageStore } from '~/store/storage.store'

const loadingStore = useLoadingStore()

const storageStore = useStorageStore()
const selectedOption = ref<SummaryTimeType>('month')
const selectOption = (event: Event) => {
  const value = (<HTMLSelectElement>event.target).value
  selectedOption.value = <SummaryTimeType>value
  storageStore.setSummaryTimeType(selectedOption.value)
}

onMounted(() => {
  selectedOption.value = storageStore.getSummaryTimeType() || 'month'
})
</script>

<style></style>
