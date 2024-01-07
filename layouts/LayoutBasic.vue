<template>
  <div class="flex | h-dvh overflow-hidden">
    <aside class="hidden lg:block | w-[240px] h-full | border">
      <GNB />
    </aside>
    <div class="flex flex-col | w-full h-full">
        <slot name="header"><Header /></slot>
      <div
        id="scroll-area"
        ref="scrollArea"
        class="relative | h-full overflow-auto"
        @scroll="checkShowScrollTop">
        <slot />
      </div>
      <nav class="relative | border">
        <div class="absolute right-0 -top-4 -translate-y-full | w-fit | ml-auto mr-3 | flex flex-col gap-1">
          <button v-if="isShowScrollTop" class="flex items-center justify-center | aspect-square overflow-hidden | bg-black rounded-full | text-white | p-2"
                  @click="scrollTop">
            <i class="icon icon-arrow-top | text-xl "></i>
          </button>
          <slot name="actions"/>
        </div> 
        <ul class="flex lg:hidden justify-around | py-2 | bg-white">
          <NuxtLink to="/">
            <li>
              <button class="flex flex-col items-center gap-.5">
                <i class="icon icon-home | text-xl"></i>
                <span class="text-xs">Home</span>
              </button>
            </li>
          </NuxtLink>   
          <NuxtLink to="/">
            <li>
              <button class="flex flex-col items-center gap-.5">
                <i class="icon icon-file | text-xl"></i>
                <span class="text-xs">Todo</span>
              </button>
            </li>
          </NuxtLink>   
          <NuxtLink to="/calender">
            <li>
              <button class="flex flex-col items-center gap-.5">
                <i class="icon icon-calender | text-xl"></i>
                <span class="text-xs">Calender</span>
              </button>
            </li>
          </NuxtLink>     
          <NuxtLink to="/analysis">
            <li>
              <button class="flex flex-col items-center gap-.5">
                <i class="icon icon-analysis | text-xl"></i>
                <span class="text-xs">Analysis</span>
              </button>
            </li>
          </NuxtLink>  
        </ul>
      </nav>
    </div>
    
    <!-- <div class="fixed right-8 bottom-8 | flex flex-col gap-2">
      <button v-if="isShowScrollTop" class="flex items-center justify-center | aspect-square overflow-hidden | bg-black rounded-full | text-white | p-2"
              @click="scrollTop">
        <i class="icon icon-arrow-top | text-xl "></i>
      </button>
      <slot name="actions"/>
    </div> -->
  </div>
</template>

<script setup lang="ts">
const scrollArea = ref<HTMLDivElement>()
const scrollTop = () => toValue(scrollArea)?.scrollTo({top: 0})
const isShowScrollTop = ref(false)

const checkShowScrollTop = () => {
  const scrollTop = toValue(scrollArea)?.scrollTop || 0
  isShowScrollTop.value = scrollTop > 10
}

onMounted(() => {
  checkShowScrollTop()
})
</script>