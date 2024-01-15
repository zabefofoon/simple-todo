<template>
  <ul
    v-if="$route.name !== 'todo-id'"
    class="flex lg:hidden justify-around | py-2 | bg-white">
    <NuxtLink to="/">
      <li>
        <button class="flex flex-col items-center gap-.5">
          <i class="icon icon-home | text-xl"></i>
          <span class="text-xs">Home</span>
        </button>
      </li>
    </NuxtLink>
    <NuxtLink to="/todo">
      <li>
        <button class="flex flex-col items-center gap-.5">
          <i class="icon icon-file | text-xl"></i>
          <span class="text-xs">Todo</span>
        </button>
      </li>
    </NuxtLink>
    <NuxtLink to="/calender">
      <li>
        <button class="flex flex-col items-center gap-.5">
          <i class="icon icon-calender | text-xl"></i>
          <span class="text-xs">Calender</span>
        </button>
      </li>
    </NuxtLink>
    <NuxtLink to="/setting">
      <li>
        <button class="flex flex-col items-center gap-.5">
          <i class="icon icon-setting | text-xl"></i>
          <span class="text-xs">Setting</span>
        </button>
      </li>
    </NuxtLink>
  </ul>
</template>

<script setup lang="ts"></script>

<style></style>
