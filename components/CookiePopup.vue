<template>
  <div
    v-if="!cookiesAccepted"
    class="flex flex-col gap-2 | fixed bottom-0 left-0 z-50 | w-full | px-4 py-8 | text-center border-t"
    :class="
      storageStore.getThemeClass(
        'bg-white border-slate-300',
        'bg-slate-950 border-slate-600'
      )
    ">
    <p
      class="text-sm lg:text-md | max-w-[300px] | mx-auto"
      :class="storageStore.getThemeClass('', 'text-white')"
      v-html="$t('CookiesAcceptNotice')"></p>
    <NuxtLink
      to="https://memoku.netlify.app/privacy-policy.html"
      target="_blank"
      class="underline | text-sm lg:text-md"
      :class="storageStore.getThemeClass('', 'text-white')">
      {{ $t('ShowPrivacyPolicy') }}
    </NuxtLink>
    <div class="flex gap-3 justify-center | w-full | mt-4">
      <button
        class="bg-slate-500 | text-white text-sm lg:text-md | px-4 py-2"
        @click="allConsentGranted">
        {{ $t('AcceptAll') }}
      </button>
      <button
        class="bg-slate-500 | text-white text-sm lg:text-md | px-4 py-2"
        @click="setCookiesAccepted(true)">
        {{ $t('AgreeLater') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'

const { gtag } = useGtag()
const storageStore = useStorageStore()

const cookiesAccepted = ref(false)
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

// const consentGrantedAdStorage = () => {
//   gtag('consent', 'update', {
//     ad_storage: 'granted',
//   })
//   setCookieConsent()
// }

const setCookieConsent = () => {
  setCookiesAccepted(true)
  storageStore.setCookiesAccepted()
}

onMounted(() => {
  setCookiesAccepted(storageStore.getCookiesAccepted())
})
</script>
