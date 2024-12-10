<template>
  <div class="relative">
    <label
      for="filter"
      class="absolute top-0 left-0 -translate-y-1/2 | text-[8px] lg:text-[10px]"
      :class="storageStore.getThemeClass('bg-white', 'bg-slate-900 text-white')"
      v-t="'Tag'">
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
      :value="route.query.tag || 'All'"
      @change="changeTag">
      <option
        :class="storageStore.getThemeClass('', 'text-white')"
        value="All"
        v-t="'All'"></option>
      <option
        v-for="tag in settingStore.setting?.tags"
        :key="tag.id"
        :class="storageStore.getThemeClass('', 'text-white')"
        :value="tag.id">
        {{ tag.label }}
      </option>
      <option
        :class="storageStore.getThemeClass('', 'text-white')"
        value="memo">
        memo
      </option>
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
