<template>
  <aside
    class="relative | flex-shrink-0 | hidden lg:block | w-[240px] h-full | border-r"
    style="transition: width 150ms ease"
    :class="[
      storageStore.isSNBExpanded ? 'w-[240px]' : 'w-[52px]',
      storageStore.getThemeClass(
        'border-slate-200 | bg-white',
        'bg-slate-900 border-slate-700'
      ),
    ]">
    <nav class="flex flex-col | h-full">
      <NuxtLinkLocale to="/" area-label="Home">
        <div
          class="pt-8 | text-center font-bold | flex justify-center items-center gap-1">
          <img
            class="w-[20px] aspect-square"
            :class="
              storageStore.getThemeClass('', 'invert contrast-100 grayscale')
            "
            src="~/assets/images/logo.svg"
            alt="MEMOKU" />
          <Transition name="fade">
            <span
              v-if="storageStore.isSNBExpanded"
              :class="storageStore.getThemeClass('', 'text-white')">
              MEMOKU
            </span>
          </Transition>
        </div>
      </NuxtLinkLocale>
      <ul class="h-full mt-8">
        <NuxtLinkLocale
          v-for="menu in menuStore.menus"
          :key="menu.code"
          :to="menu.href"
          :area-label="menu.name">
          <li
            class="relative | flex items-center gap-3 | py-3 px-4"
            :class="[
              storageStore.isSNBExpanded ? '' : 'justify-center',
              menu.href === route.path
                ? storageStore.getThemeClass('bg-slate-100', 'bg-slate-950')
                : storageStore.getThemeClass('', ''),
            ]">
            <i
              class="icon | text-xl | flex-shrink-0"
              :class="[
                menu.icon,
                storageStore.getThemeClass('', 'text-white'),
              ]"></i>
            <Transition name="fade">
              <span
                v-if="storageStore.isSNBExpanded"
                :class="storageStore.getThemeClass('', 'text-white')">
                {{ i18n.t(menu.name) }}
              </span>
            </Transition>
          </li>
        </NuxtLinkLocale>
      </ul>
    </nav>
    <button
      class="absolute top-1/2 right-0 -translate-y-1/2 z-[9999] | p-1"
      :class="[
        storageStore.isSNBExpanded
          ? 'rounded-l-full'
          : 'rounded-r-full translate-x-full',
        storageStore.getThemeClass(
          'border | bg-white',
          'bg-slate-800 | text-white'
        ),
      ]"
      @click="storageStore.expandSNB()">
      <i
        v-if="storageStore.isSNBExpanded"
        class="icon icon-arrow-left | text-sm"></i>
      <i v-else class="icon icon-arrow-right | text-sm"></i>
    </button>
  </aside>
</template>

<script setup lang="ts">
import { useMenuStore } from '~/store/menu.store'
import { useStorageStore } from '~/store/storage.store'

const menuStore = useMenuStore()
const storageStore = useStorageStore()
const i18n = useI18n()

const route = useRoute()
</script>
