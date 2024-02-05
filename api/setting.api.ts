import type { Setting } from '~/models/Setting'
import { db } from '~/plugins/dexie.client'

export const getSetting = () => {
  return db!.setting.toArray()
}

export const setSetting = (setting: Setting) => {
  return setting.id
    ? db!.setting.put(setting)
    : db!.setting.put(setting, setting.id)
}

export const updateSetting = (id: number, setting: Partial<Setting>) => {
  return db!.setting.update(id, setting)
}

export default { getSetting, setSetting, updateSetting }
