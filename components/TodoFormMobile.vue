<template>
  <div
    class="safe-area-margin-bottom | h-full overflow-auto | flex flex-col gap-2 justify-start | p-4">
    <!-- 양식 & 태그 -->
    <div class="flex gap-2">
      <!-- 양식 -->
      <div class="w-full | relative">
        <label
          class="absolute top-0 left-0 -translate-y-1/2 | text-[9px] | rounted-full"
          :class="
            storageStore.getThemeClass('bg-white', 'bg-slate-900 text-white')
          ">
          {{ i18n.t('Form') }}
        </label>
        <select
          class="w-full | text-sm | px-2 py-1 | border rounded-lg"
          :class="
            storageStore.getThemeClass(
              'bg-white',
              'dark | bg-slate-900 | text-white | border-slate-700'
            )
          "
          @change="emit('change-form', $event)">
          <option
            value="None"
            :class="storageStore.getThemeClass('', 'text-white')">
            {{ i18n.t('None') }}
          </option>
          <option
            v-for="form in settingStore.setting?.forms"
            :key="form.id"
            :value="form.id"
            :class="storageStore.getThemeClass('', 'text-white')">
            {{ form.title }}
          </option>
        </select>
      </div>
      <!-- 양식 -->

      <!-- 태그 -->
      <div class="w-full | relative">
        <label
          class="flex items-center gap-0.5 | absolute top-0 left-0 -translate-y-1/2 | text-[9px] | rounted-full"
          :class="
            storageStore.getThemeClass('bg-white', 'bg-slate-900 text-white')
          ">
          <div
            v-if="tagId"
            class="w-2 h-2"
            :style="{
              background: settingStore.setting?.tags.find(
                (tag) => tag.id === tagId
              )?.color,
            }"></div>
          <span :class="storageStore.getThemeClass('', 'text-white')">
            {{ i18n.t('Tag') }}
          </span>
        </label>
        <select
          class="w-full | text-sm | px-2 py-1 | border rounded-lg"
          :value="tagId"
          :class="
            storageStore.getThemeClass(
              'bg-white',
              'dark | bg-slate-900 | text-white | border-slate-700'
            )
          "
          @change="emit('set-tag', $event)">
          <option
            :value="''"
            :class="storageStore.getThemeClass('', 'text-white')">
            {{ i18n.t('None') }}
          </option>
          <option
            v-for="tag in settingStore.setting?.tags"
            :key="tag.id"
            :value="tag.id"
            :class="storageStore.getThemeClass('', 'text-white')">
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
          <i
            class="icon icon-close | text-lg"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
        </button>
      </div>
      <div class="w-full h-full | relative">
        <textarea
          :value="description"
          class="w-full h-full | border rounded-lg | resize-none | p-2"
          :class="[
            { 'pt-6': todo },
            storageStore.getThemeClass(
              '',
              'bg-slate-900 text-white border-slate-700'
            ),
          ]"
          :placeholder="i18n.t('Description')"
          @input="emit('changed')"
          @change="emit('set-description', $event)" />
        <div class="absolute bottom-3 right-3">
          <img
            v-if="todo?.linked"
            class="w-[10px]"
            src="~assets/images/google.svg" />
        </div>
      </div>
    </div>

    <UICarousel class="w-full" drag-free perview="auto" gap="6px">
      <UICarouselSlide
        class="w-[80px] h-[80px] | border rounded-lg | grid items-center justify-center"
        :class="storageStore.getThemeClass('', 'border-slate-700')"
        @click="emit('add-image')">
        <i class="icon icon-add"></i>
      </UICarouselSlide>
      <UICarouselSlide
        v-for="(image, index) in images"
        :key="image"
        class="w-[80px] h-[80px] | border rounded-lg overflow-hidden | relative"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
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
        class="flex items-center gap-1.5 | px-2 py-3 pr-3 | text-xs | border rounded-lg | cursor-pointer"
        :style="{ opacity: upto ? '1' : '.4' }"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
        <i
          class="icon icon-timer"
          :class="storageStore.getThemeClass('', 'text-white')"></i>
        <span :class="storageStore.getThemeClass('', 'text-white')">
          {{ i18n.t('Upto') }}
        </span>
      </label>
      <div
        v-if="upto"
        class="flex gap-1 | ml-auto"
        :style="{ opacity: upto ? '1' : '.4' }">
        <input
          :value="date"
          class="w-fit | border rounded-lg | p-2 | text-xs"
          type="date"
          :class="
            storageStore.getThemeClass(
              'bg-white',
              'dark | bg-slate-900 text-white | border-slate-700'
            )
          "
          @change="emit('set-date', $event)" />
        <input
          :value="time"
          class="w-fit | border rounded-lg | px-2 py-1 | text-xs"
          :class="
            storageStore.getThemeClass(
              'bg-white',
              'dark | bg-slate-900 text-white | border-slate-700'
            )
          "
          type="time"
          @change="emit('set-time', $event)" />
      </div>
    </div>
    <!-- 알림 -->

    <!-- 저장 -->
    <div class="flex flex-col gap-2 | mt-auto">
      <button
        v-if="!googleStore.googleAccessToken"
        name="Save"
        class="w-full | flex items-center justify-center gap-2 | bg-slate-800 | text-white rounded-full | py-2"
        @click="emit('save')">
        <i class="icon icon-lock"></i>
        <span class="text-white">{{ i18n.t('Save') }}</span>
      </button>
      <div v-else class="flex items-center">
        <button
          name="Upload"
          class="flex items-center justify-center gap-2 | w-full | bg-violet-600 | text-white rounded-full | py-2"
          @click="emit('upload')">
          <img class="flex-shrink-0" src="~/assets/images/google.svg" />
          <span class="text-white">{{ i18n.t('Upload') }}</span>
        </button>
        <UISelector @click.stop>
          <template #button="{ showOptions }">
            <button class="flex | text-white" @click="showOptions()">
              <i class="icon icon-overflow-vertical | text-xl"></i>
            </button>
          </template>
          <template #options>
            <div
              class="flex flex-col gap-1.5 | px-4 py-2 | rounded-lg overflow-hidden | whitespace-nowrap"
              :class="storageStore.getThemeClass('', 'text-white')">
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
    </div>

    <!-- 저장 -->
  </div>
</template>

<script setup lang="ts">
import { Todo } from '~/models/Todo'
import { useGoogleStore } from '~/store/google.store'
import { useSettingStore } from '~/store/setting.store'
import { useStorageStore } from '~/store/storage.store'

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
const googleStore = useGoogleStore()

const imageSrc = (image: string | Blob) => {
  return typeof image === 'string' ? image : URL.createObjectURL(image)
}
</script>
