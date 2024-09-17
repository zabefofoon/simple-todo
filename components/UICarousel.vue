<template>
  <div class="embla">
    <slot :index="currentIndex" name="cover"></slot>
    <div
      ref="emblaRef"
      class="embla__viewport"
      :style="{ height: vertical ? '100%' : 'auto' }"
      @mousedown.stop
      @touchstart.stop>
      <div
        ref="emblaContainer"
        class="embla__container"
        :style="{ gap, flexDirection: vertical ? 'column' : 'row', height: vertical ? `100%` : 'auto' }">
        <slot :perview="perview" />
      </div>
    </div>
    <div class="embla__controls">
      <div v-if="useDots" ref="dotsNode" class="embla__dots"></div>
      <div
        v-if="useCounter"
        ref="counterNode"
        class="embla__selected-snap-display"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Autoplay, { type AutoplayType } from 'embla-carousel-autoplay'
import emblaCarouselVue from 'embla-carousel-vue'

const props = withDefaults(
  defineProps<{
    // active?: boolean
    gap?: string
    perview?: number | 'auto'
    loop?: boolean
    dragFree?: boolean
    startIndex?: number
    autoplay?: boolean
    useDots?: boolean
    useCounter?: boolean
    vertical?: boolean
  }>(),
  {
    gap: '0px',
    perview: 1,
    startIndex: 0,
  }
)

const emit = defineEmits<{
  (e: 'change', index: number): void
}>()

// CarouselSlide 내부에서 스타일을 조정하기 위한 provide
provide('perview', props.perview)
provide('startIndex', props.startIndex)

onMounted(() => {
  if (props.useDots) addDotBtnsAndClickHandlers(dotsNode.value!)
  if (props.useCounter) updateSelectedSnapDisplay(counterNode.value!)

  toValue(emblaApi)?.on('select', (event) => {
    const index = event.selectedScrollSnap() || 0
    emit('change', index)
    setCurrentIndex(index)
  })
})

const dotsNode = ref<HTMLDivElement>()
const counterNode = ref<HTMLDivElement>()
const currentIndex = ref(0)

const getPlugins = (): AutoplayType[] => {
  const result: AutoplayType[] = []

  if (props.autoplay)
    result.push(
      Autoplay({
        stopOnInteraction: false,
        delay: 4000,
      })
    )

  return result
}
const [emblaRef, emblaApi] = emblaCarouselVue(
  {
    loop: props.loop,
    dragFree: props.dragFree,
    startIndex: props.startIndex,
    axis: props.vertical ? 'y' : 'x',
  },
  getPlugins()
)

const setCurrentIndex = (value = 0): void => {
  currentIndex.value = value
}

const addDotBtnsAndClickHandlers = (dotsNode: HTMLElement): (() => string) => {
  let dotNodes: HTMLElement[] = []

  const addDotBtnsWithClickHandlers = (): void => {
    dotsNode.innerHTML = emblaApi
      .value!.scrollSnapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join('')

    const scrollTo = (index: number): void => emblaApi.value?.scrollTo(index)

    dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'))
    dotNodes.forEach((dotNode, index) =>
      dotNode.addEventListener('click', () => scrollTo(index), false)
    )
  }

  const toggleDotBtnsActive = (): void => {
    const previous = emblaApi.value!.previousScrollSnap()
    const selected = emblaApi.value!.selectedScrollSnap()
    if (dotNodes[previous] && dotNodes[selected]) {
      dotNodes[previous].classList.remove('embla__dot--selected')
      dotNodes[selected].classList.add('embla__dot--selected')
    }
  }

  emblaApi.value
    ?.on('init', addDotBtnsWithClickHandlers)
    .on('reInit', addDotBtnsWithClickHandlers)
    .on('init', toggleDotBtnsActive)
    .on('reInit', toggleDotBtnsActive)
    .on('select', toggleDotBtnsActive)

  return () => (dotsNode.innerHTML = '')
}

const updateSelectedSnapDisplay = (snapDisplay: HTMLElement) => {
  const updateSnapDisplay = (): void => {
    const selectedSnap = emblaApi.value!.selectedScrollSnap()
    const snapCount = emblaApi.value!.scrollSnapList().length
    snapDisplay.innerHTML = `${selectedSnap + 1} / ${snapCount}`
  }

  emblaApi
    .value!.on('select', updateSnapDisplay)
    .on('reInit', updateSnapDisplay)
  updateSnapDisplay()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (): any =>
    emblaApi
      .value!.off('select', updateSnapDisplay)
      .off('reInit', updateSnapDisplay)
}

watch(
  () => props.startIndex,
  (index) => emblaApi.value?.scrollTo(index || 0)
)

if (import.meta.client) {
  watch(
    () => [props.useDots, dotsNode.value],
    () => {
      if (props.useDots && dotsNode.value) {
        addDotBtnsAndClickHandlers(dotsNode.value)
      }
    }
  )
}
</script>
