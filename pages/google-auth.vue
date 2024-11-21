<template><span></span></template>

<script setup lang="ts">
import { useGoogleStore } from '~/store/google.store'
import { useStorageStore } from '~/store/storage.store'

const route = useRoute()
const googleStore = useGoogleStore()
const storageStore = useStorageStore()
const localePath = useLocalePath()

onMounted(() => {
  if (route.query.refreshToken) {
    googleStore.setGoogleRefreshToken(route.query.refreshToken.toString())
  }
  if (route.query.accessToken)
    googleStore.setGoogleAccessToken(route.query.accessToken.toString())

  navigateTo(
    {
      path: localePath('/', storageStore.language),
      query: {
        authed: 'true',
      },
    },
    { replace: true }
  )
})

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>

<style></style>
