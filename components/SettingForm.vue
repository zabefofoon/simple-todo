<template>
  <div class="flex | py-3">
    <div class="flex | lg:w-60 | text-sm">
      <span>{{ $t('Form') }}</span>
      <NuxtLink to="/form/new">
        <button
          class="flex | h-fit | p-1 ml-auto lg:ml-0 | border border-dashed">
          <i class="icon icon-add | text-md"></i>
        </button>
      </NuxtLink>
    </div>
    <div class="flex flex-col lg:gap-1 | ml-auto lg:ml-0">
      <ClientOnly>
        <div
          v-for="(form, index) in settingStore.setting?.forms"
          class="flex items-center gap-0.5">
          <button class="flex" @click="changeOrder(index, index - 1)">
            <i class="icon icon-arrow-top | text-sm"></i>
          </button>
          <button class="flex" @click="changeOrder(index, index + 1)">
            <i class="icon icon-arrow-down | text-sm"></i>
          </button>
          <NuxtLink :to="`/form/${form.id}`">
            <button class="flex items-center gap-2 | border | pl-2 pr-1 py-0.5">
              <span class="text-sm">{{ form.title }}</span>
              <i class="icon icon-close" @click.prevent="removeForm(form)"></i>
            </button>
          </NuxtLink>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Form } from '~/models/Setting'
import { useSettingStore } from '~/store/setting.store'

const settingStore = useSettingStore()
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

<style></style>
