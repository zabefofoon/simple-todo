<template>
  <div
    v-if="!resizing"
    class="w-full | flex flex-nowrap flex-col lg:flex-row gap-2 lg:gap-5">
    <SummaryDones class="order-2" :key="donesKey + tagsKey" />
    <SummaryTime class="order-3" :key="donesKey + tagsKey" />
    <SummaryTags class="order-1 lg:order-4" :key="donesKey + tagsKey" />
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce'

const todoStore = useTodoStore()
const settingStore = useSettingStore()
const storageStore = useStorageStore()

const resizing = ref(false)
const checkResizing = (value: boolean) => (resizing.value = value)

const resizeHandler = () => {
  hideTooltip()
  checkResizing(true)
  debounce(() => checkResizing(false), 200)()
}

const donesKey = ref(0)
const updateDones = () => donesKey.value++
const doneTodoLength = computed(
  () => todoStore.todos?.filter((todo) => todo.done).length
)
watch(doneTodoLength, updateDones)

const tagsKey = ref(0)
const updateTags = () => tagsKey.value++
const tags = computed(
  () =>
    settingStore.setting?.tags.reduce<Record<string, number>>(
      (acc, current) => {
        acc[current.label] =
          todoStore.todos?.filter((todo) => todo.tagId === current.id).length ||
          0
        return acc
      },
      {}
    ) || {}
)
watch(tags, updateTags, { deep: true })
watch(
  () => [storageStore.theme, storageStore.isSNBExpanded],
  () => {
    setTimeout(() => {
      updateDones()
      updateTags()
    }, 150)
  }
)

const hideTooltip = () => {
  const tooltipEl = document.getElementById('chartjs-tooltip')
  if (!tooltipEl) return

  tooltipEl.style.opacity = '0'
  tooltipEl.style.left = '0'
  tooltipEl.style.top = '0'
}

onMounted(() => {
  window.addEventListener('resize', resizeHandler)
  document
    .getElementById('scroll-area')
    ?.addEventListener('scroll', hideTooltip)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
  hideTooltip()
  document
    .getElementById('scroll-area')
    ?.removeEventListener('scroll', hideTooltip)
})
</script>
