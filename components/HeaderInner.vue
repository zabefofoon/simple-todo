<template>
  <header
    class="flex items-center gap-3 | py-2 px-4 | border-b"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <button name="Back" class="flex" @click="router.back()">
      <i
        class="icon icon-arrow-left"
        :class="storageStore.getThemeClass('', 'text-white')"></i>
    </button>
    <div
      :key="label"
      v-html="label"
      class="w-full | text-lg truncate | cursor-pointer"
      :class="storageStore.getThemeClass('', 'text-white')"
      @click="router.back()"></div>

    <slot></slot>
  </header>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'

defineProps<{
  label: string
}>()

const storageStore = useStorageStore()
const router = useRouter()
</script>
