<template>
  <div class="flex | border-b border-theme | py-3">
    <label class="lg:w-60 | text-sm text-theme" v-t="'Notification'"> </label>
    <span
      v-if="isGrantedNotification"
      class="ml-auto lg:ml-0 px-4 py-0.5 lg:px-0 | text-sm text-theme"
      name="Export"
      v-t="'ON'">
    </span>
    <button
      v-else
      class="ml-auto lg:ml-0 px-4 py-0.5 | bg-red-500 | text-sm text-white | rounded-full"
      name="Export"
      @click="requestNofification"
      v-t="'OFF'"></button>
  </div>
</template>

<script setup lang="ts">
const i18n = useI18n()

const isGrantedNotification = ref()
const checkGrantedNotification = (value: boolean) =>
  (isGrantedNotification.value = value)

onMounted(() => {
  const isGranted =
    'Notification' in window && Notification.permission === 'granted'
  checkGrantedNotification(isGranted)
})

const requestNofification = async () => {
  const permission = await Notification.requestPermission()
  checkGrantedNotification(permission === 'granted')
  if (permission !== 'granted') alert(i18n.t('NotificationNotice'))
}
</script>
