<template>
  <NuxtLinkLocale
    :to="to"
    class="flex | bg-slate-800 rounded-full | text-white | p-2 | relative"
    area-label="New todo"
    @click="guideStore.showAddGuide(true)">
    <i class="icon icon-add text-2xl text-white"></i>
    <ClientOnly>
      <div
        v-if="!loading.todoLoading && !guideStore.isShowAddGuide"
        class="add-guide | px-3 py-1.5 | absolute -left-1 top-0 -translate-x-full -translate-y-1/2 | text-center text-xs lg:text-sm whitespace-nowrap"
        :class="
          storageStore.getThemeClass('bg-slate-800', 'bg-slate-800 text-white')
        ">
        <div
          class="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 | w-2 h-2 | rounded-full | bg-red-500"></div>
        <span v-t="'AddGuide'"></span>
      </div>
    </ClientOnly>
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
const route = useRoute()
const storageStore = useStorageStore()
const loading = useLoadingStore()
const guideStore = useGuideStore()

const to = computed(() => {
  const query = routerUtil.queryToString(route.query)
  return route.query.calendar
    ? `${route.path}?${query}&edit=new&date=${route.query.calendar}`
    : `${route.path}?${query}&edit=new`
})
</script>

<style scoped lang="scss">
.add-guide {
  animation: spread 1000ms ease 500ms forwards;
  transform-origin: 0%;
  opacity: 0;
}

@keyframes spread {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
