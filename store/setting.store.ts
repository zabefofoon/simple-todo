import { defineStore } from 'pinia'
import settingApi from '~/api/setting.api'
import { Setting } from '~/models/Setting'
import { deepClone } from '~/utils/etc'

export const useSettingStore = defineStore('setting', () => {
  const setting = ref<Setting>()

  const initSetting = async () => {
    const [data] = await settingApi.getSetting()
    const result = Setting.of(data)
    settingApi.setSetting(result)
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
      if (!found) setting.value!.forms.push(tag)
    })

    settingApi.setSetting(deepClone(setting.value))
  }

  return {
    setting,
    updateSetting,
    importSetting,
    initSetting,
  }
})
