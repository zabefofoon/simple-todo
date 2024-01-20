<template>
  <div class="flex | border-b | py-3">
    <label class="lg:w-60 | text-sm">Theme</label>
    <ClientOnly>
      <select
        v-if="settingStore.setting"
        :value="settingStore.setting.theme"
        class="ml-auto lg:ml-0 | bg-white | text-sm"
        @change="changeTheme">
        <option value="white">White</option>
        <option value="dark">Dark</option>
      </select>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Theme } from '~/models/Setting'
import { useSettingStore } from '~/store/setting.store'

const settingStore = useSettingStore()

const changeTheme = (event: Event) => {
  const value = <Theme>(<HTMLSelectElement>event.target).value
  settingStore.updateSetting('theme', value)
}
</script>

<style></style>
