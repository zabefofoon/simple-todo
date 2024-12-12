<template>
  <div class="relative">
    <label
      for="filter"
      class="absolute top-0 left-0 -translate-y-1/2 | text-[8px] lg:text-[10px] text-theme | bg-theme-3"
      v-t="'Filter'">
    </label>
    <select
      id="filter"
      class="border border-theme rounded-md | px-1 py-0.5 | text-xs text-theme | bg-theme-3"
      :class="storageStore.getThemeClass('', 'dark ')"
      :value="route.query.filter || 'All'"
      @change="changeFilter">
      <option value="All" v-t="'All'"></option>
      <option value="Undone" v-t="'Undone'"></option>
      <option value="Done" v-t="'Done'"></option>
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
