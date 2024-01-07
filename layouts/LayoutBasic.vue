<template>
  <div class="flex | h-dvh">
    <aside class="hidden lg:block | w-[240px] h-full | border">
      <GNB />
    </aside>
    <div class="flex flex-col | w-full h-full">
        <slot name="header"><Header /></slot>
      <div
        id="scroll-area"
        class="h-full overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style></style>
