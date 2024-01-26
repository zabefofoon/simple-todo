<template>
  <div class="flex | border-t border-b | py-3">
    <label class="lg:w-60 | text-sm">{{ $t('Update') }}</label>
    <ClientOnly>
      <button
        class="ml-auto lg:ml-0 | flex | border border-red-500 rounded-full"
        @click="updateVersion">
        <span class="py-0.5 px-2 | text-sm text-red-500"> Install v0.0.0 </span>
      </button>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const updateVersion = () => {
  initServiceWorker()
}

const initServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    for (const registration of registrations) {
      registration.unregister()
    }
  }
}
</script>
