<template>
  <div
    class="flex | border-b | py-3"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <label
      class="lg:w-60 | text-sm"
      :class="storageStore.getThemeClass('', 'text-white')">
      {{ i18n.t('Notification') }}
    </label>
    <span
      v-if="isGrantedNotification"
      class="ml-auto lg:ml-0 px-4 py-0.5 lg:px-0 | text-sm"
      :class="storageStore.getThemeClass('', 'text-white')"
      name="Export">
      On
    </span>
    <button
      v-else
      class="ml-auto lg:ml-0 px-4 py-0.5 | bg-red-500 | text-sm text-white | rounded-full"
      name="Export"
      @click="requestNofification">
      {{ i18n.t('OFF') }}
    </button>
  </div>
</template>

<script setup lang="ts">
const i18n = useI18n()
const storageStore = useStorageStore()

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
