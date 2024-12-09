<template>
  <div class="flex items-center justify-center">
    <div class="spinner" :style="{ width }"></div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string
  }>(),
  {
    width: '50px',
  }
)
</script>

<style>
.spinner {
  display: inline-block;
  aspect-ratio: 1;
  border: 3px solid rgba(71, 85, 105, 0.3);
  border-radius: 50%;
  border-top-color: rgba(71, 85, 105, 1);
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
