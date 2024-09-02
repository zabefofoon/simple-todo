<template>
  <NuxtLayout name="layout-basic">
    <template #header>
      <header
        class="flex items-center gap-3 | py-2 px-4 | border-b | overflow-hidden"
        :class="storageStore.getThemeClass('', 'border-slate-700')">
        <button name="Back" class="flex" @click="$router.back()">
          <i
            class="icon icon-arrow-left"
            :class="storageStore.getThemeClass('', 'text-white')"></i>
        </button>
        <div
          class="w-full | text-lg truncate | cursor-pointer"
          @click="$router.back()">
          <span
            v-if="isEditMode"
            :class="storageStore.getThemeClass('', 'text-white')">
            {{ editForm?.title }}
          </span>
          <span v-else :class="storageStore.getThemeClass('', 'text-white')">
            Form
          </span>
        </div>
      </header>
    </template>
    <div
      v-if="loadingStore.todoLoading"
      class="h-full | flex items-center justify-center">
      <Spinner />
    </div>
    <template v-else>
      <div class="p-4">
        <div class="flex flex-col gap-2">
          <div class="flex lg:gap-2">
            <button
              name="Save"
              class="hidden lg:block | bg-slate-800 | text-white rounded-full | px-5 py-1 ml-auto">
              <span class="text-white" @click="save">{{ i18n.t('Save') }}</span>
            </button>
          </div>
          <input
            ref="inputTitle"
            :placeholder="i18n.t('Title')"
            class="border | p-2"
            :class="
              storageStore.getThemeClass(
                '',
                'bg-slate-900 | border-slate-700 | text-white'
              )
            "
            :value="title"
            @input="setTitle" />
          <textarea
            ref="textArea"
            class="border | h-auto min-h-[300px] max-h-[50vh] resize-none | p-2"
            :class="
              storageStore.getThemeClass(
                '',
                'bg-slate-900 | border-slate-700 | text-white'
              )
            "
            :placeholder="i18n.t('Description')"
            :value="description"
            @change="setDescription"
            @input="resizeTextArea" />
        </div>
      </div>
      <button
        name="Save"
        class="lg:hidden | w-[96vw] | bg-slate-800 | text-white rounded-full | py-3 lg:py-2 mx-auto mt-auto mb-4">
        <span class="text-white" @click="save">{{ i18n.t('Save') }}</span>
      </button>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Form } from '~/models/Setting'
import { useLoadingStore } from '~/store/loading.store'
import { useSettingStore } from '~/store/setting.store'
import { useStorageStore } from '~/store/storage.store'

const route = useRoute()
const router = useRouter()
const i18n = useI18n()

const settingStore = useSettingStore()
const loadingStore = useLoadingStore()
const storageStore = useStorageStore()

const textArea = ref<HTMLTextAreaElement>()
const resizeTextArea = () => {
  if (!textArea.value) return

  textArea.value.style.height = `0px`
  textArea.value.style.height = `${textArea.value.scrollHeight}px`
}

const title = ref('')
const setTitle = (value: string | Event) => {
  title.value =
    typeof value === 'object'
      ? (<HTMLTextAreaElement>value.target).value
      : value
}

const description = ref('')
const setDescription = (value: string | Event) => {
  description.value =
    typeof value === 'object'
      ? (<HTMLTextAreaElement>value.target).value
      : value
}

const isEditMode = computed(() => route.params.id !== 'new')
const editForm = computed(() =>
  settingStore.setting?.forms.find((form) => form.id === route.params.id)
)

const inputTitle = ref<HTMLInputElement>()
const validate = () => {
  if (!toValue(title)) {
    alert('Enter the title.')
    toValue(inputTitle)?.focus()
    return
  }
  return true
}

const save = async () => {
  if (!validate()) return

  const forms = deepClone<Form[]>(settingStore.setting?.forms || [])

  if (toValue(isEditMode)) {
    const found = forms.find((form) => form.id === route.params.id)
    if (!found) return
    found.title = toValue(title)
    found.description = toValue(description)
    await settingStore.updateSetting('forms', forms)
  } else {
    forms.push(
      Form.of({
        title: toValue(title),
        description: toValue(description),
      })
    )
    await settingStore.updateSetting('forms', forms)
  }
  router.back()
}

onMounted(() => {
  if (toValue(isEditMode)) {
    setTitle(toValue(editForm)?.title || '')
    setDescription(toValue(editForm)?.description || '')
  }
})
</script>