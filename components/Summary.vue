<template>
  <div
    class="w-full overflow-auto | flex flex-nowrap flex-col lg:flex-row gap-2">
    <template v-if="!resizing">
      <SummaryDones />
      <SummaryTags />
      <SummaryTime />
    </template>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce'

const resizing = ref(false)
const checkResizing = (value: boolean) => (resizing.value = value)

onMounted(() => {
  window.addEventListener('resize', () => {
    checkResizing(true)
    debounce(() => checkResizing(false), 100)()
  })
})
</script>

<style></style>
