<template>
  <div class="h-full overflow-hidden | p-4">
    <div class="h-full flex flex-col gap-6 lg:gap-2 | relative">
      <div class="flex flex-col lg:flex-row gap-2 lg:items-center">
        <div class="flex gap-2 flex-col lg:flex-row lg:items-center | w-full">
          <div class="flex gap-2">
            <!-- 양식 -->
            <div class="w-full | relative">
              <label
                class="absolute top-0 left-0 -translate-y-1/2 | text-[9px] text-theme | bg-theme-3 | rounted-full">
                {{ i18n.t('Form') }}
              </label>
              <select
                class="w-full lg:w-fit | text-sm text-theme | bg-theme-3 | px-2 py-1 | border border-theme rounded-lg"
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
                class="bg-theme-3 | text-theme | flex items-center gap-0.5 | absolute top-0 left-0 -translate-y-1/2 | text-[9px] | rounted-full">
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
                class="w-full lg:w-fit | bg-theme-3 | text-sm text-theme | px-2 py-1 | border border-theme rounded-lg"
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
              class="flex items-center gap-1.5 | px-2 py-3 pr-3 lg:py-2.5 | text-xs text-theme | border border-theme rounded-lg | cursor-pointer"
              :style="{ opacity: upto ? '1' : '.4' }">
              <i class="icon icon-timer"></i>
              <span>
                {{ i18n.t('Upto') }}
              </span>
            </label>
            <div
              v-if="upto"
              class="flex gap-1 lg:gap-2 | ml-auto lg:ml-0"
              :style="{ opacity: upto ? '1' : '.4' }">
              <input
                :value="date"
                class="w-fit | border border-theme rounded-lg | p-2 | text-xs text-theme | bg-theme-3"
                type="date"
                :class="storageStore.getThemeClass('', 'dark')"
                @change="emit('set-date', $event)" />
              <input
                :value="time"
                class="w-fit | bg-theme-3 | border border-theme rounded-lg | px-2 py-1 | text-xs text-theme"
                :class="storageStore.getThemeClass('', 'dark')"
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
              : 'border border-slate-400 dark:border-white'
          "
          @click="emit('done')">
          <i
            class="icon icon-check"
            :class="
              todo?.done ? 'text-white' : 'text-slate-500 dark:text-white'
            "></i>
        </button>
        <!-- 체크 -->

        <!-- 저장 -->
        <div class="flex-shrink-0 | flex gap-1.5">
          <div v-if="!todo?.linked" class="flex items-center">
            <button
              name="Upload"
              class="flex items-center | bg-slate-700 | text-white | rounded-full | pl-6"
              @click="emit('save')">
              <i class="icon icon-lock | mr-2"></i>
              <span class="flex-shrink-0 | whitespace-nowrap">
                {{ i18n.t('Save') }}
              </span>
              <div class="border-l border-slate-500 | ml-4">&nbsp;</div>
              <UISelector class="px-0.5 py-1.5 pr-2.5" @click.stop>
                <template #button="{ showOptions }">
                  <button class="flex | text-white" @click="showOptions()">
                    <i class="icon icon-chevron-down"></i>
                  </button>
                </template>
                <template #options>
                  <div
                    class="flex flex-col gap-1.5 | px-4 py-2 | rounded-lg overflow-hidden | whitespace-nowrap text-slate-800 dark:text-white">
                    <button
                      name="Save"
                      class="flex items-center gap-2 | text-sm | pr-2.5"
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
            </button>
          </div>
          <div v-else class="flex items-center">
            <button
              name="Upload"
              class="flex items-center | bg-violet-600 | rounded-full | pl-6"
              @click="emit('upload')">
              <img
                class="flex-shrink-0 | w-3.5 | mr-2"
                src="~/assets/images/google.svg" />
              <span class="flex-shrink-0 | text-white whitespace-nowrap">
                {{ i18n.t('Upload') }}
              </span>
              <div class="border-l border-violet-400 | ml-4">&nbsp;</div>
              <UISelector class="px-0.5 py-1.5 pr-2.5" @click.stop>
                <template #button="{ showOptions }">
                  <button
                    class="flex | text-white dark:text-white"
                    @click="showOptions()">
                    <i class="icon icon-chevron-down"></i>
                  </button>
                </template>
                <template #options>
                  <div
                    class="flex flex-col gap-1.5 | px-4 py-2 | rounded-lg overflow-hidden | whitespace-nowrap dark:text-white">
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
            </button>
          </div>
        </div>

        <!-- 저장 -->
      </div>
      <div class="flex gap-4 | h-full | overflow-hidden">
        <div class="w-full h-full | relative">
          <textarea
            :value="description"
            class="w-full h-full | text-theme | bg-theme-3 | border border-theme rounded-lg focus-visible:outline-0 focus-visible:border-orange-200 | resize-none | p-2"
            :placeholder="i18n.t('Description')"
            @input="emit('changed')"
            @change="emit('set-description', $event)"
            @keydown="keydownHandler" />
          <div class="absolute bottom-3 right-3">
            <img
              v-if="todo?.linked"
              class="w-[16px]"
              src="~/assets/images/google.svg" />
          </div>
        </div>

        <div class="h-full | p-3 | border border-theme rounded-lg">
          <UICarousel
            class="h-full"
            vertical
            perview="auto"
            gap="10px"
            drag-free>
            <UICarouselSlide
              class="w-[200px] h-[200px] | border border-theme rounded-lg | grid items-center justify-center | cursor-pointer"
              @click="emit('add-image')">
              <i class="icon icon-add"></i>
            </UICarouselSlide>
            <UICarouselSlide
              v-for="(image, index) in images"
              :key="image"
              class="w-[200px] h-[200px] | border border-theme rounded-lg overflow-hidden | relative | cursor-grab">
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
  (e: 'paste-image', blob: Blob): void
}>()

const i18n = useI18n()

const storageStore = useStorageStore()
const settingStore = useSettingStore()

const imageSrc = (image: string | Blob) => {
  return typeof image === 'string' ? image : URL.createObjectURL(image)
}

const keydownHandler = async (event: KeyboardEvent) => {
  if (event.code === 'KeyV' && (event.ctrlKey || event.metaKey)) {
    const clipboardItems = await navigator.clipboard.read()
    for (const clipboardItem of clipboardItems) {
      for (const type of clipboardItem.types) {
        const blob = await clipboardItem.getType(type)
        if (blob.type.startsWith('image/')) emit('paste-image', blob)
      }
    }
  }
}
</script>
