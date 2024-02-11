<template>
  <div
    class="flex | border-b | py-3"
    :class="storageStore.getThemeClass('', 'border-slate-700')">
    <div class="flex gap-1 | lg:w-60 | text-sm">
      <span :class="storageStore.getThemeClass('', 'text-white')">
        {{ $t('Tag') }}
      </span>
      <button
        name="Add tag"
        class="flex | w-fit h-fit | p-1 | border border-dashed"
        @click="addTag">
        <i
          class="icon icon-add | text-md"
          :class="storageStore.getThemeClass('', 'text-white')"></i>
      </button>
    </div>
    <div class="flex flex-col lg:gap-1 | ml-auto lg:ml-0">
      <div v-if="loadingStore.todoLoading">
        <Skeletor
          v-for="index in 3"
          :key="index"
          class="w-[100px] h-[28px] mb-1" />
      </div>
      <template v-else>
        <div
          v-for="(tag, index) in settingStore.setting?.tags"
          :key="index"
          class="flex items-center gap-0.5">
          <button name="Move up" class="flex">
            <i
              class="icon icon-arrow-top | text-sm"
              :class="storageStore.getThemeClass('', 'text-white')"
              @click="changeOrder(index, index - 1)"></i>
          </button>
          <button name="Move down" class="flex">
            <i
              class="icon icon-arrow-down | text-sm"
              :class="storageStore.getThemeClass('', 'text-white')"
              @click="changeOrder(index, index + 1)"></i>
          </button>
          <div
            class="flex items-center | border"
            :class="storageStore.getThemeClass('', 'border-slate-700')">
            <label class="pl-1" :for="`color-input-${index}`">
              <div
                class="w-4 aspect-square"
                :style="{ background: tag.color || 'black' }"></div>
            </label>
            <input
              :id="`color-input-${index}`"
              :value="tag.color"
              class="p-0 | w-0 aspect-square"
              :class="storageStore.getThemeClass('bg-white', 'bg-slate-900')"
              type="color"
              list="color-list"
              @change="changeTag(index, 'color', $event)" />
            <datalist id="color-list">
              <option>#535c68</option>
              <option>#130f40</option>
              <option>#4834d4</option>
              <option>#be2edd</option>
              <option>#22a6b3</option>
              <option>#30336b</option>
              <option>#686de0</option>
              <option>#e056fd</option>
              <option>#7ed6df</option>
              <option>#6ab04c</option>
              <option>#eb4d4b</option>
              <option>#f0932b</option>
              <option>#f9ca24</option>
              <option>#badc58</option>
              <option>#ff7979</option>
              <option>#ffbe76</option>
              <option>#f6e58d</option>
            </datalist>
            <input
              :value="tag.label"
              class="min-w-[16px] w-16 | py-1 px-2 | text-sm"
              :class="
                storageStore.getThemeClass(
                  'bg-white',
                  'bg-slate-900 text-white'
                )
              "
              placeholder="Tag"
              @change="changeTag(index, 'label', $event)" />
            <button name="Delete" class="flex pr-1" @click="removeTag(index)">
              <i
                class="icon icon-close"
                :class="storageStore.getThemeClass('', 'text-white')"></i>
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tag } from '~/models/Tag'
import { useLoadingStore } from '~/store/loading.store'
import { useSettingStore } from '~/store/setting.store'
import { useStorageStore } from '~/store/storage.store'
import { useTodoStore } from '~/store/todo.store'
import { deepClone } from '~/utils/etc'

const i18n = useI18n()

const todoStore = useTodoStore()
const settingStore = useSettingStore()
const storageStore = useStorageStore()
const loadingStore = useLoadingStore()

const changeOrder = (from: number, to: number) => {
  const last = settingStore.setting!.tags.length - 1
  to = to < 0 ? last : to > last ? 0 : to

  const tags = deepClone(settingStore.setting!.tags)
  const removed = tags.splice(from, 1)[0]
  tags.splice(to, 0, removed)
  settingStore.updateSetting('tags', tags)
}

const changeTag = (index: number, key: keyof Tag, event: Event) => {
  const tags = deepClone(settingStore.setting!.tags)
  tags[index][key] = (<HTMLInputElement>event.target).value
  settingStore.updateSetting('tags', tags)
}

const removeTag = (index: number) => {
  if (!confirm(i18n.t('ConfirmDelete'))) return

  const tags = deepClone(settingStore.setting!.tags)
  tags.splice(index, 1)
  const result = !tags.length ? undefined : tags
  settingStore.updateSetting('tags', result)
}

const addTag = () => {
  const tags = deepClone(settingStore.setting!.tags)
  tags.push(Tag.of({ label: '', color: '' }))
  settingStore.updateSetting('tags', tags)
}
</script>
