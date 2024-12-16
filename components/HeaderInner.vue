<template>
  <header class="flex items-center gap-3 | py-3 px-4 | border-b border-theme">
    <button name="Back" class="flex" @click="back()">
      <i class="icon icon-arrow-left | text-theme"></i>
    </button>
    <div
      :key="label"
      v-html="escapeHTML(label)"
      class="w-full lg:w-1/2 | mr-auto | text-lg truncate text-theme | cursor-pointer"
      @click="back()"></div>

    <slot></slot>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()

const storageStore = useStorageStore()
const router = useRouter()
const route = useRoute()
const localePath = useLocalePath()

const back = () => {
  !history.state.back || route.fullPath.includes(history.state.back)
    ? navigateTo(localePath('/', storageStore.language))
    : router.back()
}
</script>
