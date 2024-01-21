<template>
  <ul
    v-if="$route.name !== 'todo-id'"
    class="flex lg:hidden justify-around | bg-white">
    <NuxtLink
      to="/"
      class="w-full"
      :class="{ 'bg-slate-800': '/' === route.path }">
      <li class="w-full | py-1.5">
        <button class="w-full | flex flex-col items-center gap-.5">
          <i
            class="icon icon-home | text-xl"
            :class="{ 'text-white': '/' === route.path }"></i>
          <span class="text-xs" :class="{ 'text-white': '/' === route.path }">
            {{ $t('Home') }}
          </span>
        </button>
      </li>
    </NuxtLink>
    <NuxtLink
      to="/todo"
      class="w-full"
      :class="{ 'bg-slate-800': '/todo' === route.path }">
      <li class="py-1.5">
        <button class="flex flex-col items-center gap-.5 | mx-auto">
          <i
            class="icon icon-file | text-xl"
            :class="{ 'text-white': '/todo' === route.path }"></i>
          <span
            class="text-xs"
            :class="{ 'text-white': '/todo' === route.path }">
            {{ $t('Todo') }}
          </span>
        </button>
      </li>
    </NuxtLink>
    <NuxtLink
      to="/calender"
      class="w-full"
      :class="{ 'bg-slate-800': '/calender' === route.path }">
      <li class="py-1.5">
        <button class="flex flex-col items-center gap-.5 | mx-auto">
          <i
            class="icon icon-calender | text-xl"
            :class="{ 'text-white': '/calender' === route.path }"></i>
          <span
            class="text-xs"
            :class="{ 'text-white': '/calender' === route.path }">
            {{ $t('Calender') }}
          </span>
        </button>
      </li>
    </NuxtLink>
    <NuxtLink
      to="/setting"
      class="w-full"
      :class="{ 'bg-slate-800': '/setting' === route.path }">
      <li class="py-1.5">
        <button class="flex flex-col items-center gap-.5 | mx-auto">
          <i
            class="icon icon-setting | text-xl"
            :class="{ 'text-white': '/setting' === route.path }"></i>
          <span
            class="text-xs"
            :class="{ 'text-white': '/setting' === route.path }">
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
