<template>
  <div class="flex | py-3">
    <div class="flex gap-1 | lg:w-60 | text-sm">
      <span :class="storageStore.getThemeClass('', 'text-white')">
        {{ i18n.t('Form') }}
      </span>
      <NuxtLinkLocale to="/setting?form=new" area-label="New Form">
        <button
          name="New form"
          class="flex | h-fit | p-1 ml-auto lg:ml-0 | border border-dashed">
          <i
            class="icon icon-add | text-md"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
        </button>
      </NuxtLinkLocale>
    </div>
    <div class="flex flex-col lg:gap-1 | ml-auto lg:ml-0">
      <div v-if="loadingStore.todoLoading">
        <Skeletor
          v-for="index in 2"
          :key="index"
          class="w-[100px] h-[28px] mb-1" />
      </div>
      <template v-else>
        <div
          v-for="(form, index) in settingStore.setting?.forms"
          class="flex items-center gap-0.5">
          <button
            class="flex"
            name="Move up"
            @click="changeOrder(index, index - 1)">
            <i
              class="icon icon-arrow-top | text-sm"
              :class="storageStore.getThemeClass('', 'text-white')"></i>
          </button>
          <button
            class="flex"
            name="Move down"
            @click="changeOrder(index, index + 1)">
            <i
              class="icon icon-arrow-down | text-sm"
              :class="storageStore.getThemeClass('', 'text-white')"></i>
          </button>
          <NuxtLinkLocale
            :to="`/setting?form=${form.id}`"
            area-label="New form">
            <button
              name="Add form"
              class="flex items-center gap-2 | border | pl-2 pr-1 py-0.5"
              :class="storageStore.getThemeClass('', 'border-slate-700')">
              <span
                class="text-sm"
                :class="storageStore.getThemeClass('', 'text-white')">
                {{ form.title }}
              </span>
              <i
                class="icon icon-close"
                :class="storageStore.getThemeClass('', 'text-white')"
                @click.prevent="removeForm(form)"></i>
            </button>
          </NuxtLinkLocale>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Form } from '~/models/Setting'
import { useLoadingStore } from '~/store/loading.store'
import { useSettingStore } from '~/store/setting.store'
import { useStorageStore } from '~/store/storage.store'

const settingStore = useSettingStore()
const storageStore = useStorageStore()
const loadingStore = useLoadingStore()

const i18n = useI18n()

const removeForm = async (data: Form) => {
  if (!confirm(i18n.t('ConfirmDelete'))) return

  const forms = deepClone<Form[]>(settingStore.setting?.forms || [])
  const found = forms.findIndex((form) => form.id === data.id)
  forms.splice(found, 1)
  const result = !forms.length ? undefined : forms
  await settingStore.updateSetting('forms', result)
}

const changeOrder = (from: number, to: number) => {
  const last = settingStore.setting!.forms.length - 1
  to = to < 0 ? last : to > last ? 0 : to

  const forms = deepClone(settingStore.setting!.forms)
  const removed = forms.splice(from, 1)[0]
  forms.splice(to, 0, removed)
  settingStore.updateSetting('forms', forms)
}
</script>
