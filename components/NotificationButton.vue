<template>
  <NuxtLinkLocale
    :to="{ query: { notification: 'true' } }"
    area-label="Notification">
    <button class="flex | relative" name="Notification">
      <div
        v-if="alarmStore.hasUnReadNewAlarms"
        class="absolute top-[1px] left-[1px] | aspect-square w-2 | bg-red-500 | rounded-full"></div>
      <i
        class="icon icon-notification | text-xl"
        :class="storageStore.getThemeClass('', 'text-white')"></i>
    </button>
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
const storageStore = useStorageStore()
const alarmStore = useAlarmStore()
</script>
