<template>
  <nav class="flex flex-col | h-full">
    <div class="py-4 | border | text-center">Simple Todos</div>
    <ul class="h-full">
      <NuxtLink to="/">
        <li class="py-1 px-3">Todo</li>
      </NuxtLink>
      <NuxtLink to="/calender">
        <li class="py-1 px-3">Calender</li>
      </NuxtLink>
      <NuxtLink to="/analysis">
        <li class="py-1 px-3">Analysis</li>
      </NuxtLink>
      <NuxtLink to="/setting">
        <li class="py-1 px-3">Setting</li>
      </NuxtLink>
      <NuxtLink to="/">
        <li class="py-1 px-3">Guide</li>
      </NuxtLink>
    </ul>
    <Footer />
  </nav>
</template>

<script setup lang="ts"></script>

<style></style>
