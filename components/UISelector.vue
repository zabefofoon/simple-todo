<template>
  <div
    ref="selectorEl"
    v-click-outside="() => showOptions(false)"
    class="relative">
    <!-- 버튼 slot. 없다면, 기본 버튼 노출 -->
    <slot name="button" :show-options="showOptions"> </slot>
    <!-- 버튼 slot. 없다면, 기본 버튼 노출 -->

    <!-- Options 영역 -->
    <Transition
      :name="`select-options-${optionsPosition.y.toLocaleLowerCase()}`">
      <ul
        v-if="isShowOptions"
        class="absolute z-10 | rounded-lg shadow-lg | touch-none border"
        :class="[
          optionsPositionClass,
          storageStore.getThemeClass(
            'bg-white',
            'bg-slate-900 border-slate-700'
          ),
        ]">
        <!-- Options slot -->
        <slot name="options" :show-options="showOptions"></slot>
        <!-- Options slot -->
      </ul>
    </Transition>
    <!-- Options 영역 -->
  </div>
</template>
<script setup lang="ts">
import debounce from 'lodash.debounce'
import { useStorageStore } from '~/store/storage.store'

const props = defineProps<{
  position?: Position
}>()

const emit = defineEmits<{
  (e: 'opened', value: boolean): void
}>()

const storageStore = useStorageStore()

type Direction = 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM' | 'CENTER'

interface Position {
  x: Direction
  y: Direction
}

const isShowOptions = ref(false)
const selectorEl = ref<HTMLSelectElement>()
const optionsPosition = ref<Position>({
  x: 'RIGHT',
  y: 'BOTTOM',
})

const optionsPositionClass = computed<string>(() => {
  const xAxis = optionsPosition.value.x === 'LEFT' ? 'left-0' : 'right-0'
  const yAxis =
    optionsPosition.value.y === 'BOTTOM'
      ? 'bottom-[-.4rem] translate-y-full'
      : 'top-[-.4rem] -translate-y-full'
  return `${xAxis} ${yAxis}`
})

const showOptions = (value?: boolean): void => {
  isShowOptions.value = value === undefined ? !isShowOptions.value : value
  calculatePosition()

  emit('opened', isShowOptions.value)
}

const calculatePosition = (): void => {
  const rect = selectorEl.value?.getBoundingClientRect()
  if (rect == null) return

  // 뷰포트 좌측상단(0,0)으로부터의 거리
  const relativeLeft = rect.left
  const relativeTop = rect.top

  if (props.position?.x != null) {
    optionsPosition.value.x = props.position.x
  } else {
    const overScreenMiddle = relativeLeft > window.innerWidth / 2
    optionsPosition.value.x = overScreenMiddle ? 'RIGHT' : 'LEFT'
  }

  if (props.position?.y != null) {
    optionsPosition.value.y = props.position.y
  } else {
    const overScreenMiddle = relativeTop > window.innerHeight / 2
    optionsPosition.value.y = overScreenMiddle ? 'TOP' : 'BOTTOM'
  }
}

onMounted(() => {
  window.addEventListener(
    'scroll',
    debounce(() => showOptions(false), 100, { leading: true })
  )
})
</script>
