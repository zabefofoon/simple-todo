<template><span></span></template>

<script setup lang="ts">
import { useGoogleStore } from '~/store/google.store'

const route = useRoute()
const googleStore = useGoogleStore()

onMounted(() => {
  if (route.query.refreshToken) {
    googleStore.setGoogleRefreshToken(route.query.refreshToken.toString())
  }
  if (route.query.accessToken)
    googleStore.setGoogleAccessToken(route.query.accessToken.toString())
  location.replace('/')
})
</script>

<style></style>
