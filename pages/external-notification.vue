<template></template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
storageStore.setLanguage(storageStore.language)
const i18n = useI18n()

const router = useRouter()

onMounted(() => {
  if (storageStore.language === i18n.defaultLocale) router.replace('/')
  else router.replace(`/${i18n.locale.value}`)
})
</script>

<style></style>
