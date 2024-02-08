<template>
  <div class="loader"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.loader {
    min-width: 10px;
    min-height: 10px;
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
}
@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
