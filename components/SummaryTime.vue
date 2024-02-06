<template>
  <div
    class="flex flex-col gap-2 | w-full min-w-[200px] | border rounded-lg | p-2 lg:p-3">
    <div class="flex items-center">
      <span v-if="selectedOption === 'month'" class="font-bold">
        {{ $t('Years') }}
      </span>
      <span v-else class="font-bold">
        {{ $t('Weeks') }}
      </span>
      <select
        :value="selectedOption"
        class="ml-auto | text-sm | bg-white"
        @change="selectOption">
        <option value="month">{{ $t('Month') }}</option>
        <option value="week">{{ $t('Week') }}</option>
      </select>
    </div>
    <SummaryTimeYear v-if="selectedOption === 'month'" />
    <SummaryTimeMonth v-else />
  </div>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'
import type { SummaryTimeType } from '~/models/Summary'

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
