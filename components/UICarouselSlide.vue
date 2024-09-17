<template>
    <div
        class="embla__slide"
        :style="{ flex: flexStyle }">
        <slot />
    </div>
</template>

<script setup lang="ts">
    const perview = inject<number | "auto">("perview") ?? 1

    const flexStyle = computed(() => (perview === "auto" ? "0 0 auto" : `0 0 ${100 / perview}%`))
</script>
