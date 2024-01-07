<template>
  <nav class="flex flex-col | h-full">
    <div class="py-4 | border | text-center">Simple Todos</div>
    <ul class="h-full">
      <NuxtLink to="/">
        <li class="flex items-center gap-2 | py-1 px-3">
          <i class="icon icon-file"></i>
          <span>Todo</span>
        </li>
      </NuxtLink>
      <NuxtLink to="/calender">
        <li class="flex items-center gap-2 | py-1 px-3">
          <i class="icon icon-calender"></i>
          <span>Calender</span>
        </li>
      </NuxtLink>
      <NuxtLink to="/analysis">
        <li class="flex items-center gap-2 | py-1 px-3">
          <i class="icon icon-analysis"></i>
          <span>Analysis</span>
        </li>
      </NuxtLink>
      <NuxtLink to="/setting">
        <li class="flex items-center gap-2 | py-1 px-3">
          <i class="icon icon-setting"></i>
          <span>Setting</span>
        </li>
      </NuxtLink>
      <NuxtLink to="/">
        <li class="flex items-center gap-2 | py-1 px-3">
          <i class="icon icon-help"></i>
          <span>Guide</span>
        </li>
      </NuxtLink>
    </ul>
    <Footer />
  </nav>
</template>

<script setup lang="ts"></script>

<style></style>
