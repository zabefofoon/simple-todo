<template>
  <div
    v-if="!cookiesAccepted"
    class="border-theme | bg-theme-2 | transition-all | flex flex-col gap-2 | fixed bottom-0 left-0 z-50 | w-full | px-4 py-8 | text-center border-t"
    :class="[mounted ? '' : 'translate-y-full']">
    <p
      class="text-theme text-sm lg:text-md | max-w-[300px] | mx-auto"
      v-t="'CookiesAcceptNotice'"></p>
    <NuxtLinkLocale
      to="https://memoku.netlify.app/privacy-policy.html"
      target="_blank"
      class="underline | text-theme text-sm lg:text-md"
      external>
      <span v-t="'ShowPrivacyPolicy'"></span>
    </NuxtLinkLocale>
    <div class="flex gap-3 justify-center | w-full | mt-4">
      <button
        class="bg-slate-500 | text-white text-sm lg:text-md | px-4 py-2"
        @click="allConsentGranted">
        <span v-t="'AcceptAll'"></span>
      </button>
      <button
        class="bg-slate-500 | text-white text-sm lg:text-md | px-4 py-2"
        @click="setCookiesAccepted(true)">
        <span v-t="'AgreeLater'"></span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { gtag } = useGtag()
const storageStore = useStorageStore()

const mounted = ref(false)
const setMounted = () => (mounted.value = true)

const cookiesAccepted = ref(storageStore.getCookiesAccepted())
const setCookiesAccepted = (value: boolean) => (cookiesAccepted.value = value)

const allConsentGranted = () => {
  gtag('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    functionality_storage: 'granted',
    personalization_storage: 'granted',
    security_storage: 'granted',
  })
  setCookieConsent()
}

const setCookieConsent = () => {
  setCookiesAccepted(true)
  storageStore.setCookiesAccepted()
}

onMounted(() => {
  setMounted()
})
</script>
