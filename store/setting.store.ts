import { defineStore } from 'pinia'
import { Setting } from '~/models/Setting'
import { deepClone } from '~/utils/etc'
import settingApi from '~/api/setting.api'

export const useSettingStore = defineStore('setting', () => {
  const i18n = useI18n()

  const setting = ref<Setting>()

  const initSetting = async () => {
    const [data] = await settingApi.getSetting()
    const result = Setting.of(data)
    settingApi.setSetting(result)
    i18n.setLocale(data.language)
    setting.value = result
  }
  const updateSetting = async (
    key: keyof Setting,
    value: Setting[keyof Setting]
  ) => {
    if (!setting.value) return
    settingApi.updateSetting(toValue(setting)?.id || 0, { [key]: value })
    setting.value[key] = <never>value
  }

  const importSetting = (savedSetting: Setting) => {
    if (!setting.value) return
    savedSetting.tags.forEach((tag) => {
      const found = setting.value?.tags.find((item) => item.id === tag.id)
      if (!found) setting.value?.tags.push(tag)
    })

    savedSetting.forms.forEach((tag) => {
      const found = setting.value?.forms.find((item) => item.id === tag.id)
      if (!found) setting.value?.forms.push(tag)
    })

    settingApi.setSetting(deepClone(setting.value))
  }

  onBeforeMount(() => {
    initSetting()
  })

  return {
    setting,
    updateSetting,
    importSetting,
  }
})
