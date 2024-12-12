<template>
  <div class="flex | border-b border-theme | py-3">
    <div class="flex gap-1 | lg:w-60 | text-sm">
      <span class="text-theme" v-t="'Tag'"> </span>
      <button
        name="Add tag"
        class="flex | w-fit h-fit | p-1 | border border-dashed"
        @click="addTag">
        <i class="icon icon-add | text-md text-theme"></i>
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
              class="icon icon-arrow-top | text-sm text-theme"
              @click="changeOrder(index, index - 1)"></i>
          </button>
          <button name="Move down" class="flex">
            <i
              class="icon icon-arrow-down | text-sm text-theme"
              @click="changeOrder(index, index + 1)"></i>
          </button>
          <div class="flex items-center | border border-theme">
            <label class="pl-1" :for="`color-input-${index}`">
              <div
                class="w-4 aspect-square"
                :style="{ background: tag.color || 'black' }"></div>
            </label>
            <input
              :id="`color-input-${index}`"
              :value="tag.color"
              class="p-0 | w-0 aspect-square | bg-theme-3"
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
              class="min-w-[16px] w-16 | py-1 px-2 | text-sm text-theme | bg-theme-3"
              placeholder="Tag"
              @change="changeTag(index, 'label', $event)" />
            <button name="Delete" class="flex pr-1" @click="removeTag(index)">
              <i class="icon icon-close | text-theme"></i>
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tag } from '~/models/Tag'
import { deepClone } from '~/utils/etc'

const i18n = useI18n()

const settingStore = useSettingStore()
const loadingStore = useLoadingStore()
const googleStore = useGoogleStore()

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

  if (googleStore.googleAccessToken)
    googleStore.updateTags([settingStore.setting!.tags[index]])
}

const removeTag = (index: number) => {
  if (!confirm(i18n.t('ConfirmDelete'))) return

  const tags = deepClone(settingStore.setting!.tags)
  const removed = tags.splice(index, 1)
  const result = !tags.length ? [] : tags
  settingStore.updateSetting('tags', result)
  if (googleStore.googleAccessToken) googleStore.deleteTags(removed)
}

const addTag = () => {
  const tags = deepClone(settingStore.setting!.tags)
  tags.push(Tag.of({ label: '', color: '' }))
  settingStore.updateSetting('tags', tags)
}
</script>
