<template>
  <div class="flex | py-3">
    <label class="lg:w-60 | text-sm" v-t="'Update'"></label>
    <button
      name="Update"
      class="ml-auto lg:ml-0 | flex | border border-red-500 rounded-full"
      @click="initServiceWorker">
      <span class="px-4 py-0.5 | text-sm text-red-500"> v0.0.0 </span>
    </button>
  </div>
</template>

<script setup lang="ts">
const initServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    for (const registration of registrations) {
      registration.unregister()
    }
  }
}
</script>
