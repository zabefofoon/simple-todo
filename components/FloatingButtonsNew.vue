<template>
  <NuxtLinkLocale
    :to="to"
    class="flex | bg-slate-800 rounded-full | text-white | p-2 | relative"
    area-label="New todo">
    <i class="icon icon-add text-2xl text-white"></i>
    <ClientOnly>
      <div
        v-if="!loading.todoLoading && guideStore.isShowAddGuide"
        class="add-guide | px-3 py-1.5 | absolute -left-1 top-0 -translate-x-full -translate-y-1/2 | text-center text-xs lg:text-sm whitespace-nowrap"
        :class="
          storageStore.getThemeClass('bg-slate-200', 'bg-slate-800 text-white')
        "
        @click="guideStore.showAddGuide(false)">
        <button
          class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 | rounded-full | flex"
          :class="
            storageStore.getThemeClass(
              'bg-white | border border-slate-400',
              'bg-slate-600'
            )
          ">
          <i
            class="icon icon-close text-xs"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
        </button>
        <div
          class="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 | w-2 h-2 | rounded-full | bg-red-500"></div>
        {{ i18n.t('AddGuide') }}
      </div>
    </ClientOnly>
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
import { useGuideStore } from '~/store/guide.store'
import { useLoadingStore } from '~/store/loading.store'
import { useStorageStore } from '~/store/storage.store'

const route = useRoute()
const storageStore = useStorageStore()
const loading = useLoadingStore()
const guideStore = useGuideStore()
const i18n = useI18n()

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
