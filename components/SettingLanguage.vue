<template>
  <div class="flex | border-t border-b | py-3">
    <label class="lg:w-60 | text-sm">{{ $t('Language') }}</label>
    <ClientOnly>
      <select
        v-if="settingStore.setting"
        :value="settingStore.setting.language"
        class="ml-auto lg:ml-0 | bg-white | text-sm"
        @change="changeLanguage">
        <option value="en">{{ $t('English') }}</option>
        <option value="ko">{{ $t('Korean') }}</option>
      </select>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Language } from '~/models/Setting'
import { useSettingStore } from '~/store/setting.store'

const i18n = useI18n()

const settingStore = useSettingStore()

const changeLanguage = (event: Event) => {
  const value = <Language>(<HTMLSelectElement>event.target).value
  i18n.setLocale(value)
  settingStore.updateSetting('language', value)
}
</script>

<style></style>
