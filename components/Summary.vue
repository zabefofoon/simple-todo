<template>
  <div
    class="w-full overflow-auto | flex flex-nowrap flex-col lg:flex-row gap-2">
    <template v-if="!resizing">
      <SummaryDones :key="donesKey" />
      <SummaryTags :key="tagsKey" />
      <SummaryTime :key="donesKey"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce'
import { useTodoStore } from '~/store/todo.store'

const todoStore = useTodoStore()

const resizing = ref(false)
const checkResizing = (value: boolean) => (resizing.value = value)

const resizeHandler = () => {
  checkResizing(true)
  debounce(() => checkResizing(false), 100)()
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
    todoStore.todos
      ?.flatMap((todo) => todo.tags)
      .map((tag) => tag.label)
      .reduce<Record<string, number>>((acc, current) => {
        acc[current] = (acc[current] || 0) + 1
        return acc
      }, {}) || {}
)
watch(tags, updateTags, { deep: true })

onMounted(() => {
  window.addEventListener('resize', resizeHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})
</script>

<style></style>
