<template>
  <ul
    v-if="$route.name !== 'todo-id'"
    class="flex lg:hidden justify-around | bg-white">
    <NuxtLink to="/" class="w-full">
      <li class="pb-1.5 pt-2.5">
        <button class="relative | flex flex-col items-center gap-.5 | mx-auto">
          <div
            v-if="'/' === route.path"
            class="absolute -top-1 | w-1 h-1 | bg-slate-600 rounded-full"></div>
          <i class="icon icon-home | text-xl"></i>
          <span class="text-xs">
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
            class="absolute -top-1 | w-1 h-1 | bg-slate-600 rounded-full"></div>
          <i class="icon icon-file | text-xl"></i>
          <span class="text-xs">
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
            class="absolute -top-1 | w-1 h-1 | bg-slate-600 rounded-full"></div>
          <i class="icon icon-calender | text-xl"></i>
          <span class="text-xs">
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
            class="absolute -top-1 | w-1 h-1 | bg-slate-600 rounded-full"></div>
          <i class="icon icon-setting | text-xl"></i>
          <span class="text-xs">
            {{ $t('Setting') }}
          </span>
        </button>
      </li>
    </NuxtLink>
  </ul>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style></style>
