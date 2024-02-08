<template>
  <ul
    v-if="$route.name !== 'todo-id'"
    class="flex lg:hidden justify-around | border-t"
    :class="
      storageStore.getThemeClass('bg-white', 'bg-slate-900 border-slate-700')
    ">
    <NuxtLink to="/" class="w-full">
      <li class="pb-1.5 pt-2.5">
        <button class="relative | flex flex-col items-center gap-.5 | mx-auto">
          <div
            v-if="'/' === route.path"
            class="absolute -top-1 | w-1 h-1 | rounded-full"
            :class="
              storageStore.getThemeClass('bg-slate-600', 'bg-white')
            "></div>
          <i
            class="icon icon-home | text-xl"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
          <span
            class="text-xs"
            :class="storageStore.getThemeClass('', 'text-white')">
            {{ $t('Home') }}
          </span>
        </button>
      </li>
    </NuxtLink>
    <NuxtLink to="/todo" class="w-full">
      <li class="pb-1.5 pt-2.5">
        <button class="relative | flex flex-col items-center gap-.5 | mx-auto">
          <div
            v-if="'/todo' === route.path"
            class="absolute -top-1 | w-1 h-1 | rounded-full"
            :class="
              storageStore.getThemeClass('bg-slate-600', 'bg-white')
            "></div>
          <i
            class="icon icon-file | text-xl"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
          <span
            class="text-xs"
            :class="storageStore.getThemeClass('', 'text-white')">
            {{ $t('Todo') }}
          </span>
        </button>
      </li>
    </NuxtLink>
    <NuxtLink to="/calender" class="w-full">
      <li class="pb-1.5 pt-2.5">
        <button class="relative | flex flex-col items-center gap-.5 | mx-auto">
          <div
            v-if="'/calender' === route.path"
            class="absolute -top-1 | w-1 h-1 | rounded-full"
            :class="
              storageStore.getThemeClass('bg-slate-600', 'bg-white')
            "></div>
          <i
            class="icon icon-calender | text-xl"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
          <span
            class="text-xs"
            :class="storageStore.getThemeClass('', 'text-white')">
            {{ $t('Calender') }}
          </span>
        </button>
      </li>
    </NuxtLink>
    <NuxtLink to="/setting" class="w-full">
      <li class="pb-1.5 pt-2.5">
        <button class="relative | flex flex-col items-center gap-.5 | mx-auto">
          <div
            v-if="'/setting' === route.path"
            class="absolute -top-1 | w-1 h-1 | rounded-full"
            :class="
              storageStore.getThemeClass('bg-slate-600', 'bg-white')
            "></div>
          <i
            class="icon icon-setting | text-xl"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
          <span
            class="text-xs"
            :class="storageStore.getThemeClass('', 'text-white')">
            {{ $t('Setting') }}
          </span>
        </button>
      </li>
    </NuxtLink>
  </ul>
</template>

<script setup lang="ts">
import { useStorageStore } from '~/store/storage.store'

const route = useRoute()
const storageStore = useStorageStore()
</script>

<style></style>
