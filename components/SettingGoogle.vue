<template>
  <div class="flex items-center | py-3">
    <label class="lg:w-60 | text-sm text-theme" v-t="'SpreadsheetLink'">
    </label>
    <input
      v-model="email"
      type="email"
      class="w-[120px] lg:w-[200px] | bg-transparent border-b border-theme | text-theme | p-1 ml-auto mr-3 lg:ml-0 | truncate"
      placeholder="user@google.com"
      @change="" />
    <button
      v-if="googleStore.googleAccessToken"
      class="lg:ml-0 px-4 py-0.5 | text-sm text-white | rounded-full"
      name="Export"
      :class="storageStore.getThemeClass('bg-green-400', 'bg-green-600')"
      @click="googleStore.unLinkGoogle()">
      On
    </button>
    <button
      v-else
      class="lg:ml-0 px-4 py-0.5 | bg-slate-800 | text-sm text-white | rounded-full"
      name="Export"
      @click="validate">
      <Spinner v-if="loading" width="20px" />
      <span v-else>Off</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const storageStore = useStorageStore()
const i18n = useI18n()
const googleStore = useGoogleStore()
const snackbarStore = useSnackbarStore()

const email = ref('')
const loading = ref(false)

const validate = () => {
  if (!email.value.includes('@')) {
    snackbarStore.showSnackbar({
      message: i18n.t('NoticeGoogleEmail'),
      type: 'error',
    })
    return
  }
  loading.value = true
  useCookie('x-google-email', { maxAge: 31536000 }).value = email.value
  googleStore.openGoogleLoginPopup()
}

onMounted(() => {
  email.value = useCookie('x-google-email').value ?? ''
})
</script>
