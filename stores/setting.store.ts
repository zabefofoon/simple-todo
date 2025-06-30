import settingApi from '~/api/setting.api'
import { Setting } from '~/models/Setting'
import type { Tag } from '~/models/Tag'
import { deepClone } from '~/utils/etc'

export const useSettingStore = defineStore('setting', () => {
  const setting = ref<Setting>()

  const { isDesktop } = useDevice()

  const initSetting = async () => {
    const [data] = await settingApi.getSetting()!
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

  const screen = ref<'lg' | 'sm'>(isDesktop ? 'lg' : 'sm')
  const setScreen = (value: 'lg' | 'sm') => (screen.value = value)

  const isSiped = ref(false)
  const setIsSiped = (value: boolean) => (isSiped.value = value)

  const isTouchCanceled = ref(false)
  const setIsTouchCanceled = (value: boolean) => (isTouchCanceled.value = value)

  const currentModals = ref<string[]>([])
  const pushCurrentModal = (modalName: string) =>
    currentModals.value.push(modalName)

  const popCurrentModal = () => currentModals.value.pop()

  const tagMap = computed<Record<string, Tag> | undefined>(() => {
    if (!setting.value) return
    return Object.fromEntries(setting.value.tags.map((t) => [t.id, t]))
  })

  return {
    setting,
    updateSetting,
    importSetting,
    initSetting,

    screen,
    setScreen,

    isSiped,
    setIsSiped,

    isTouchCanceled,
    setIsTouchCanceled,

    currentModals,
    pushCurrentModal,
    popCurrentModal,

    tagMap,
  }
})
