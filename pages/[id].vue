<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <header class="flex items-center gap-3 | py-2 px-4 | border">
        <button class="flex" @click="$router.back()">
          <i class="icon icon-arrow-left"></i>
        </button>
        <div class="text-lg"
             @click="$router.back()">
          Header
        </div>
      </header>  
    </template>
    <div class="p-4">Edit</div>
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style></style>
