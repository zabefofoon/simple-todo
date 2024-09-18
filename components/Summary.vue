<template>
  <div
    v-if="!resizing"
    class="w-full | flex flex-nowrap flex-col lg:flex-row gap-2">
    <SummaryTags :key="tagsKey" />
    <SummaryTime :key="donesKey" />
    <SummaryDones :key="donesKey" />
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce'
import { useTodoStore } from '~/store/todo.store'
import { useSettingStore } from '~/store/setting.store'
import { useStorageStore } from '~/store/storage.store'

const todoStore = useTodoStore()
const settingStore = useSettingStore()
const storageStore = useStorageStore()

const resizing = ref(false)
const checkResizing = (value: boolean) => (resizing.value = value)

const resizeHandler = () => {
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

onMounted(() => {
  window.addEventListener('resize', resizeHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})
</script>
