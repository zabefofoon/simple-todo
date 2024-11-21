<template>
  <header
    class="flex items-center gap-3 | py-3 px-4 | border-b"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <button name="Back" class="flex" @click="router.back()">
      <i
        class="icon icon-arrow-left"
        :class="storageStore.getThemeClass('', 'text-white')"></i>
    </button>
    <div
      :key="label"
      v-html="label"
      class="w-full lg:w-1/2 | mr-auto | text-lg truncate | cursor-pointer"
      :class="storageStore.getThemeClass('', 'text-white')"
      @click="router.back()"></div>

    <slot></slot>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()

const storageStore = useStorageStore()
const router = useRouter()
</script>
