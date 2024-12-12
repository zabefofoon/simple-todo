<template>
  <NuxtLinkLocale
    :to="{ query: { notification: 'true' } }"
    area-label="Notification">
    <button class="flex | relative" name="Notification">
      <div
        v-if="alarmStore.hasUnReadNewAlarms"
        class="absolute top-[1px] left-[1px] | aspect-square w-2 | bg-red-500 | rounded-full"></div>
      <i class="icon icon-notification | text-xl text-theme"></i>
    </button>
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
const alarmStore = useAlarmStore()
</script>
