<template>
  <header
    class="flex items-center gap-1.5 | px-4 lg:px-8 py-2 | border-b | sticky top-0 left-0 z-10 | bg-white"
    vocab="http://schema.org/"
    typeof="WebPage">
    <NuxtLinkLocale
      class="block | w-full | font-bold"
      to="/"
      area-label="Home"
      property="url">
      <div class="flex items-center justify-center gap-1 | w-fit">
        <img
          class="w-[24px] aspect-square"
          src="~/assets/images/logo.svg"
          alt="MEMOKU"
          property="logo" />
        <span property="name">MEMOKU</span>
      </div>
    </NuxtLinkLocale>
    <div>
      <select
        class="text-sm"
        v-model="i18n.locale.value"
        @change="changeLanguage">
        <option value="en">English</option>
        <option value="ko">한국어</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  </header>
  <slot />
  <footer class="bg-slate-950 | px-4 lg:px-8 py-6 | flex justify-between gap-4">
    <h2 class="flex items-center gap-2">
      <span class="text-white" property="name">MEMOKU</span>
      <span class="hidden lg:inline ml-auto | text-xs text-white"
        >#{{ i18n.t('TodoList') }}</span
      >
      <span class="hidden lg:inline text-xs text-white"
        >#{{ i18n.t('Reminder') }}
      </span>
      <span class="hidden lg:inline text-xs text-white"
        >#{{ i18n.t('TaskManager') }}
      </span>
    </h2>
    <div class="flex items-center gap-3">
      <NuxtLinkLocale
        to="https://www.threads.net/@sangwwooo/post/C7E92AAv_pz"
        target="_blank"
        class="flex ml-auto">
        <i class="icon icon-threads | text-white text-xl"></i>
      </NuxtLinkLocale>
      <NuxtLinkLocale
        to="https://zabefofoon.tistory.com/24"
        target="_blank"
        class="flex">
        <i class="icon icon-tistory | text-white text"></i>
      </NuxtLinkLocale>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Language } from '~/models/Setting'
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
const i18n = useI18n()

const changeLanguage = (event: Event) => {
  const value = <Language>(<HTMLSelectElement>event.target).value
  storageStore.setLanguage(value)
}
</script>

<style></style>
