<template>
  <div class="flex | border-b border-theme | py-3">
    <label class="lg:w-60 | text-sm text-theme" v-t="'Export'"> </label>
    <button
      class="ml-auto lg:ml-0 px-4 py-0.5 | bg-slate-800 | text-sm text-white | rounded-full"
      name="Export"
      @click="exportData"
      v-t="'Export'"></button>
  </div>
</template>

<script setup lang="ts">
const todoStore = useTodoStore()
const settingStore = useSettingStore()

const getSerializedData = async () => {
  const todos = todoStore.todos?.filter((todo) => !todo.linked) ?? []

  const serializedTodos = await Promise.all(
    todos.map(async (todo) => {
      const images = todo.images
        ? await Promise.all(
            todo.images.map((image) =>
              image instanceof Blob ? etc.blobToBase64(image) : image,
            ),
          )
        : undefined

      return {
        ...todo,
        images,
      }
    }),
  )

  return {
    todos: serializedTodos,
    setting: settingStore.setting,
  }
}

const exportData = async () => {
  const element = document.createElement('a')
  element.setAttribute(
    'href',
    `data:text/json;charset=utf-8, ${encodeURIComponent(
      JSON.stringify(await getSerializedData()),
    )}`,
  )
  element.setAttribute('download', 'data.json')
  document.body.appendChild(element)

  element.click()
  document.body.removeChild(element)
}
</script>
