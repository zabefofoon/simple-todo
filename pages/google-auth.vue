<template><span></span></template>

<script setup lang="ts">
import { useGoogleStore } from '~/store/google.store'
import { useStorageStore } from '~/store/storage.store'

const route = useRoute()
const googleStore = useGoogleStore()
const storageStore = useStorageStore()

onMounted(() => {
  if (route.query.refreshToken) {
    googleStore.setGoogleRefreshToken(route.query.refreshToken.toString())
  }
  if (route.query.accessToken)
    googleStore.setGoogleAccessToken(route.query.accessToken.toString())

  let to = '/'
  if (storageStore.language === 'ko') to = '/ko'
  else if (storageStore.language === 'ja') to = '/ja'

  navigateTo(
    {
      path: to,
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
