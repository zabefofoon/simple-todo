<template>
  <div
    class="safe-area-margin-bottom | h-full overflow-auto | flex flex-col gap-2 justify-start | p-4">
    <!-- 양식 & 태그 -->
    <div class="flex gap-2">
      <!-- 양식 -->
      <div class="w-full | relative">
        <label
          class="absolute top-0 left-0 -translate-y-1/2 | bg-theme-3 | text-[9px] text-theme | rounted-full">
          {{ i18n.t('Form') }}
        </label>
        <select
          class="w-full | text-sm text-theme | px-2 py-1 | bg-theme-3| border border-theme rounded-lg"
          :class="storageStore.getThemeClass('', 'dark')"
          @change="emit('change-form', $event)">
          <option value="None">
            {{ i18n.t('None') }}
          </option>
          <option
            v-for="form in settingStore.setting?.forms"
            :key="form.id"
            :value="form.id">
            {{ form.title }}
          </option>
        </select>
      </div>
      <!-- 양식 -->

      <!-- 태그 -->
      <div class="w-full | relative">
        <label
          class="bg-theme-3 | flex items-center gap-0.5 | absolute top-0 left-0 -translate-y-1/2 | text-theme text-[9px] | rounted-full">
          <div
            v-if="tagId"
            class="w-2 h-2"
            :style="{
              background: settingStore.setting?.tags.find(
                (tag) => tag.id === tagId
              )?.color,
            }"></div>
          <span class="text-theme">
            {{ i18n.t('Tag') }}
          </span>
        </label>
        <select
          class="w-full | text-sm | px-2 py-1 | border border-theme rounded-lg bg-theme-3 | text-theme"
          :value="tagId"
          :class="storageStore.getThemeClass('', 'dark')"
          @change="emit('set-tag', $event)">
          <option :value="''">
            {{ i18n.t('None') }}
          </option>
          <option
            v-for="tag in settingStore.setting?.tags"
            :key="tag.id"
            :value="tag.id">
            {{ tag.label }}
          </option>
        </select>
      </div>
      <!-- 태그 -->
    </div>
    <!-- 양식 & 태그 -->

    <div class="w-full h-full | flex flex-col gap-4 | relative">
      <div
        class="w-full | px-2 | absolute top-1 right-0 | flex items-center justify-between">
        <button
          v-if="todo"
          name="Check"
          class="flex | rounded-full"
          :class="todo?.done ? 'bg-green-500' : 'border border-slate-400'"
          @click="emit('done')">
          <i
            class="icon icon-check text-sm"
            :class="
              todo?.done
                ? 'text-white'
                : storageStore.getThemeClass('text-slate-500', 'text-white')
            "></i>
        </button>
        <button v-if="todo" name="Delete" class="flex" @click="emit('delete')">
          <i class="icon icon-close | text-lg text-theme"></i>
        </button>
      </div>
      <div class="w-full h-full | relative">
        <textarea
          :value="description"
          class="w-full h-full | border border-theme rounded-lg | resize-none | p-2 | bg-theme-3 | text-theme"
          :class="[{ 'pt-6': todo }]"
          :placeholder="i18n.t('Description')"
          @input="emit('changed')"
          @change="emit('set-description', $event)" />
        <div class="absolute bottom-3 right-3">
          <img
            v-if="todo?.linked"
            class="w-[10px]"
            src="~/assets/images/google.svg" />
        </div>
      </div>
    </div>

    <UICarousel class="w-full" drag-free perview="auto" gap="6px">
      <UICarouselSlide
        class="w-[80px] h-[80px] | border border-theme rounded-lg | grid items-center justify-center"
        @click="emit('add-image')">
        <i class="icon icon-add"></i>
      </UICarouselSlide>
      <UICarouselSlide
        v-for="(image, index) in images"
        :key="image"
        class="w-[80px] h-[80px] | border border-theme rounded-lg overflow-hidden | relative">
        <img
          class="w-full h-full | object-cover object-center"
          :src="imageSrc(image)" />
        <button
          class="flex | bg-slate-800 text-white | absolute top-0.5 right-0.5 | rounded-full p-0.5"
          @click="emit('delete-image', index)">
          <i class="icon icon-close | text-xs"></i>
        </button>
      </UICarouselSlide>
    </UICarousel>

    <!-- 알림 -->
    <div class="flex items-center gap-1">
      <input
        class="hidden"
        :checked="upto"
        @change="emit('set-upto', $event)"
        id="upTo"
        type="checkbox" />
      <label
        for="upTo"
        class="flex items-center gap-1.5 | px-2 py-3 pr-3 | text-xs text-theme | border border-theme rounded-lg | cursor-pointer"
        :style="{ opacity: upto ? '1' : '.4' }">
        <i class="icon icon-timer"></i>
        <span>
          {{ i18n.t('Upto') }}
        </span>
      </label>
      <div
        v-if="upto"
        class="flex gap-1 | ml-auto"
        :style="{ opacity: upto ? '1' : '.4' }">
        <input
          :value="date"
          class="w-fit | border border-theme rounded-lg | bg-theme-3 | p-2 | text-xs text-theme"
          type="date"
          :class="storageStore.getThemeClass('', 'dark')"
          @change="emit('set-date', $event)" />
        <input
          :value="time"
          class="w-fit | border border-theme rounded-lg | px-2 py-1 | text-xs text-theme"
          :class="storageStore.getThemeClass('', 'dark')"
          type="time"
          @change="emit('set-time', $event)" />
      </div>
    </div>
    <!-- 알림 -->

    <!-- 저장 -->
    <div class="flex flex-col gap-2 | mt-auto">
      <div v-if="!todo?.linked" class="flex items-center">
        <button
          name="Save"
          class="relative | flex items-center justify-center gap-2 | w-full | bg-slate-800 | text-white rounded-full | py-2"
          @click="emit('save')">
          <i class="icon icon-lock"></i>
          <span class="text-white">{{ i18n.t('Save') }}</span>
          <div
            class="absolute top-1/2 -translate-y-1/2 right-3 | border-slate-600 | pl-1.5">
            <UISelector @click.stop>
              <template #button="{ showOptions }">
                <button
                  class="flex | text-white"
                  :class="
                    storageStore.getThemeClass('text-slate-700', ' text-white')
                  "
                  @click="showOptions()">
                  <i
                    v-if="settingStore.screen === 'lg'"
                    class="icon icon-chevron-down | text-xl"></i>
                  <i v-else class="icon icon-overflow-vertical | text-xl"></i>
                </button>
              </template>
              <template #options>
                <div
                  class="flex flex-col gap-1.5 | px-4 py-2 | rounded-lg overflow-hidden | whitespace-nowrap"
                  :class="
                    storageStore.getThemeClass('text-slate-700', 'text-white')
                  ">
                  <button
                    name="Upload"
                    class="flex items-center gap-2 | text-sm | pr-3"
                    @click="emit('upload')">
                    <img class="w-[12px]" src="~/assets/images/google.svg" />
                    <span class="whitespace-nowrap">
                      {{ i18n.t('Upload') }}
                    </span>
                  </button>
                  <button
                    v-if="todo"
                    class="flex items-center gap-1"
                    @click="emit('delete')">
                    <i class="icon icon-close"></i>
                    <span class="text-sm">{{ i18n.t('DoDelete') }}</span>
                  </button>
                </div>
              </template>
            </UISelector>
          </div>
        </button>
      </div>
      <div v-else class="flex items-center">
        <button
          name="Upload"
          class="relative | flex items-center justify-center gap-2 | w-full | bg-violet-600 | text-white rounded-full | py-2"
          @click="emit('upload')">
          <img class="flex-shrink-0" src="~/assets/images/google.svg" />
          <span class="text-white">{{ i18n.t('Upload') }}</span>
          <div class="absolute top-1/2 -translate-y-1/2 right-3 | pl-1.5">
            <UISelector @click.stop>
              <template #button="{ showOptions }">
                <button
                  class="flex | text-white"
                  :class="
                    storageStore.getThemeClass('text-slate-700', ' text-white')
                  "
                  @click="showOptions()">
                  <i
                    v-if="settingStore.screen === 'lg'"
                    class="icon icon-chevron-down | text-xl"></i>
                  <i v-else class="icon icon-overflow-vertical | text-xl"></i>
                </button>
              </template>
              <template #options>
                <div
                  class="flex flex-col gap-1.5 | px-4 py-2 | rounded-lg overflow-hidden | whitespace-nowrap"
                  :class="
                    storageStore.getThemeClass('text-slate-700', 'text-white')
                  ">
                  <button
                    name="Save"
                    class="flex items-center gap-2 | text-sm"
                    @click="emit('save')">
                    <i class="icon icon-lock"></i>
                    <span class="whitespace-nowrap">
                      {{ i18n.t('Save') }}
                    </span>
                  </button>
                  <button
                    v-if="todo"
                    class="flex items-center gap-1"
                    @click="emit('delete')">
                    <i class="icon icon-close"></i>
                    <span class="text-sm">{{ i18n.t('DoDelete') }}</span>
                  </button>
                </div>
              </template>
            </UISelector>
          </div>
        </button>
      </div>
    </div>

    <!-- 저장 -->
  </div>
</template>

<script setup lang="ts">
import { Todo } from '~/models/Todo'
defineProps<{
  todo?: Todo
  description?: string
  tagId?: string
  upto?: boolean
  date?: string
  time?: string
  images?: string[]
}>()

const emit = defineEmits<{
  (e: 'save'): void
  (e: 'upload'): void
  (e: 'delete'): void
  (e: 'done'): void
  (e: 'change-form', event: Event): void
  (e: 'set-date', event: Event): void
  (e: 'set-time', event: Event): void
  (e: 'set-upto', event: Event): void
  (e: 'set-tag', event: Event): void
  (e: 'set-description', event: Event): void
  (e: 'changed'): void
  (e: 'add-image'): void
  (e: 'delete-image', index: number): void
}>()

const i18n = useI18n()

const storageStore = useStorageStore()
const settingStore = useSettingStore()

const imageSrc = (image: string | Blob) => {
  return typeof image === 'string' ? image : URL.createObjectURL(image)
}
</script>
