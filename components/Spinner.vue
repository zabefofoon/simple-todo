<template>
  <div class="flex items-center justify-center">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.spinner {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(71, 85, 105, .3);
  border-radius: 50%;
  border-top-color: rgba(71, 85, 105, 1);
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
</style>
