<template>
  <div class="relative">
    <label
      for="filter"
      class="absolute top-0 left-0 -translate-y-1/2 | text-[8px] lg:text-[10px] text-theme | bg-theme-3"
      v-t="'Tag'">
    </label>
    <select
      id="filter"
      class="border border-theme rounded-md | px-1 py-0.5 | text-xs text-theme | bg-theme-3"
      :class="storageStore.getThemeClass('', 'dark')"
      :value="route.query.tag || 'All'"
      @change="changeTag">
      <option value="All" v-t="'All'"></option>
      <option
        v-for="tag in settingStore.setting?.tags"
        :key="tag.id"
        :value="tag.id">
        {{ tag.label }}
      </option>
      <option value="memo">memo</option>
    </select>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const storageStore = useStorageStore()
const settingStore = useSettingStore()
const localePath = useLocalePath()
const changeTag = (event: Event) => {
  const value = (<HTMLSelectElement>event.target).value

  value === 'All'
    ? navigateTo(localePath(`/todo/tag`))
    : navigateTo(localePath(`/?tags=${value}`))
}
</script>
