<template>
  <div class="h-full overflow-hidden | p-4">
    <div class="h-full flex flex-col gap-6 lg:gap-2 | relative">
      <div class="flex flex-col lg:flex-row gap-2 lg:items-center">
        <div class="flex gap-2 flex-col lg:flex-row lg:items-center | w-full">
          <div class="flex gap-2">
            <!-- 양식 -->
            <div class="w-full | relative">
              <label
                class="absolute top-0 left-0 -translate-y-1/2 | text-[9px] | rounted-full"
                :class="
                  storageStore.getThemeClass(
                    'bg-white',
                    'bg-slate-900 text-white'
                  )
                ">
                {{ i18n.t('Form') }}
              </label>
              <select
                class="w-full lg:w-fit | text-sm | px-2 py-1 | border rounded-lg"
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
                  storageStore.getThemeClass(
                    'bg-white',
                    'bg-slate-900 text-white'
                  )
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
                class="w-full lg:w-fit | text-sm | px-2 py-1 | border rounded-lg"
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

          <span class="hidden lg:block opacity-30">|</span>

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
              class="flex items-center gap-1.5 | px-2 py-3 pr-3 lg:py-2.5 | text-xs | border rounded-lg | cursor-pointer"
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
              class="flex gap-1 lg:gap-2 | ml-auto lg:ml-0"
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
        </div>

        <!-- 체크 -->
        <button
          v-if="todo"
          name="Check"
          class="hidden lg:flex | rounded-full"
          :class="
            todo?.done
              ? 'bg-green-500'
              : storageStore.getThemeClass(
                  'border border-slate-400',
                  'border border-white'
                )
          "
          @click="emit('done')">
          <i
            class="icon icon-check"
            :class="
              todo?.done
                ? 'text-white'
                : storageStore.getThemeClass('text-slate-500', 'text-white')
            "></i>
        </button>
        <!-- 체크 -->

        <!-- 삭제 -->
        <button
          v-if="todo"
          name="Delete"
          class="hidden lg:flex"
          @click="emit('delete')">
          <i
            class="icon icon-close | text-xl"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
        </button>
        <!-- 삭제 -->

        <!-- 저장 -->
        <div class="flex-shrink-0 | flex gap-1.5">
          <button
            name="Save"
            class="flex items-center gap-2 | bg-slate-700 text-white | rounded-full | px-4 py-1 ml-auto"
            @click="emit('save')">
            <i class="icon icon-lock"></i>
            <span class="whitespace-nowrap">
              {{ i18n.t('Save') }}
            </span>
          </button>
          <button
            v-if="googleStore.googleAccessToken"
            name="Upload"
            class="flex items-center gap-1.5 | bg-violet-600 | rounded-full | px-4 py-1"
            @click="emit('upload')">
            <img
              class="flex-shrink-0 | w-3.5"
              src="~/assets/images/google.svg" />
            <span class="flex-shrink-0 | text-white whitespace-nowrap">
              {{ i18n.t('Upload') }}
            </span>
          </button>
        </div>

        <!-- 저장 -->
      </div>
      <div class="flex gap-4 | h-full | overflow-hidden">
        <div class="w-full h-full | relative">
          <textarea
            :value="description"
            class="w-full h-full | border rounded-lg focus-visible:outline-0 focus-visible:border-orange-200 | resize-none | p-2 lg:pt-2"
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
              class="w-[16px]"
              src="~assets/images/google.svg" />
          </div>
        </div>

        <div
          class="h-full | p-3 | border rounded-lg"
          :class="storageStore.getThemeClass('', 'border-slate-700')">
          <UICarousel
            class="h-full"
            vertical
            perview="auto"
            gap="10px"
            drag-free>
            <UICarouselSlide
              class="w-[200px] h-[200px] | border rounded-lg | grid items-center justify-center | cursor-pointer"
              :class="storageStore.getThemeClass('', 'border-slate-700')"
              @click="emit('add-image')">
              <i class="icon icon-add"></i>
            </UICarouselSlide>
            <UICarouselSlide
              v-for="(image, index) in images"
              :key="image"
              class="w-[200px] h-[200px] | border rounded-lg overflow-hidden | relative | cursor-grab"
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
        </div>
      </div>
    </div>
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
