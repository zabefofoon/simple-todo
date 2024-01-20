<template>
  <div class="flex | border-b | py-3">
    <label class="lg:w-60 | text-sm">{{ $t('Display') }}</label>
    <ClientOnly>
      <select
        v-if="settingStore.setting"
        :value="settingStore.setting.display"
        class="ml-auto lg:ml-0 | bg-white | text-sm"
        @change="changeDisplay">
        <option value="thumbnail">{{ $t('Thumbnail') }}</option>
        <option value="row">{{ $t('Row') }}</option>
      </select>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Display } from '~/models/Setting'
import { useSettingStore } from '~/store/setting.store'

const settingStore = useSettingStore()

const changeDisplay = (event: Event) => {
  const value = <Display>(<HTMLSelectElement>event.target).value
  settingStore.updateSetting('display', value)
}
</script>

<style></style>
