<template>
  <Transition name="fade">
    <div
      v-if="isExpanded"
      class="lg:hidden | fixed top-0 left-0 z-20 | w-full h-full"
      style="background: rgba(0, 0, 0, 0.3)"
      @click="expand(false)"></div>
  </Transition>
  <header class="relative z-30 | lg:hidden">
    <div
      class="flex items-center gap-1.5 | relative z-30 | px-4 py-2 | border-b"
      :class="
        storageStore.getThemeClass(
          'bg-white',
          'bg-slate-900 | border-slate-700'
        )
      ">
      <NuxtLink class="block | w-full | font-bold" to="/" area-label="Home">
        <div class="flex items-center justify-center gap-1 | w-fit">
          <img
            class="w-[24px] aspect-square"
            :class="
              storageStore.getThemeClass(
                '',
                'border-2 border-white rounded-full'
              )
            "
            src="~/assets/images/logo.svg"
            alt="MEMOKU" />
          <span :class="storageStore.getThemeClass('', 'text-white')">
            MEMOKU
          </span>
        </div>
      </NuxtLink>
      <DarkModeButton />
      <NotificationButton />
      <ChangeDisplayButton />
      <button class="flex" name="menus" @click="expand()">
        <i
          v-if="!isExpanded"
          class="icon icon-bars text-2xl"
          :class="storageStore.getThemeClass('', 'text-white')"></i>
        <i
          v-else
          class="icon icon-close text-2xl"
          :class="storageStore.getThemeClass('', 'text-white')"></i>
      </button>
    </div>
    <LNB :is-expanded="isExpanded" />
  </header>
</template>

<script setup lang="ts">
import { useScrollStore } from '~/store/scroll.store'
import { useStorageStore } from '~/store/storage.store'

const scrollStore = useScrollStore()
const storageStore = useStorageStore()

const isExpanded = ref(false)
const expand = (value?: boolean) => {
  isExpanded.value = value === undefined ? !toValue(isExpanded) : value

  scrollStore.lockScroll(toValue(isExpanded))
}
</script>
