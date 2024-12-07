<template>
  <div class="relative">
    <label
      for="filter"
      class="absolute top-0 left-0 -translate-y-1/2 | text-[8px] lg:text-[10px]"
      :class="storageStore.getThemeClass('bg-white', 'bg-slate-900 text-white')"
      v-t="'Filter'">
    </label>
    <select
      id="filter"
      class="border rounded-md | px-1 py-0.5 | text-xs"
      :class="
        storageStore.getThemeClass(
          'bg-white',
          'dark | bg-slate-900 text-white | border-slate-700'
        )
      "
      :value="route.query.filter || 'All'"
      @change="changeFilter">
      <option
        :class="storageStore.getThemeClass('', 'text-white')"
        value="All"
        v-t="'All'"></option>
      <option
        :class="storageStore.getThemeClass('', 'text-white')"
        value="Undone"
        v-t="'Undone'"></option>
      <option
        :class="storageStore.getThemeClass('', 'text-white')"
        value="Done"
        v-t="'Done'"></option>
    </select>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const storageStore = useStorageStore()

const changeFilter = (event: Event) => {
  const value = (<HTMLSelectElement>event.target).value
  let filter = undefined
  if (value === 'All') filter = undefined
  else if (value === 'Undone') filter = 'Undone'
  else if (value === 'Done') filter = 'Done'

  navigateTo({ query: { ...route.query, filter } })
}
</script>
