import { defineStore } from 'pinia'
import { Setting } from '~/models/Setting'
import settingApi from '~/api/setting.api'

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

  onBeforeMount(() => {
    initSetting()
  })

  return {
    setting,
    updateSetting,
  }
})
