<template>
  <div>
    <ClientOnly>
      <MMStyle v-html="generateCss(nodes, widgetGroups)"></MMStyle>
    </ClientOnly>
    <div v-show="mounted" v-html="generateHtml(nodes)"></div>
    <div
      v-if="!mounted"
      style="height: 100vh; display: grid; place-content: center">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MMStyle from './MMStyle.vue'
import type { Group, Node } from './type'
import { generateCss, generateHtml } from './utils'

withDefaults(
  defineProps<{
    nodes: Node[]
    widgetGroups: Group[]
  }>(),
  {
    nodes: () => [],
    widgetGroups: () => [],
  }
)

const mounted = ref(false)
onMounted(() => (mounted.value = true))
</script>

<style lang="scss" scoped>
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(71, 85, 105, 0.3);
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
