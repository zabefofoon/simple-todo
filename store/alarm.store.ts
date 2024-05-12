import { defineStore } from 'pinia'
import alarmApi from '~/api/alarm.api'
import type { RegistAlarmDTO } from '~/models/Alarm'
import etcUtil from '~/utils/etc'

export const useAlarmStore = defineStore(
  'alarm',
  () => {
    const newAlarms = ref<number[]>()
    const addNewAlarm = (todoId: number) => {
      if (newAlarms.value?.includes(todoId)) {
        const index = newAlarms.value.indexOf(todoId)
        const spliced = newAlarms.value.splice(index, 1)
        if (spliced?.[0]) newAlarms.value.unshift(spliced[0])
      } else if (newAlarms.value?.length)
        newAlarms.value = [todoId, ...newAlarms.value]
      else newAlarms.value = [todoId]
    }
    const removeNewAlarm = (todoId: number) =>
      (newAlarms.value = newAlarms.value?.filter((alarm) => alarm !== todoId))

    const readNewAlarms = ref<number[]>()
    const addReadNewAlarm = (todoId: number) => {
      if (readNewAlarms.value?.includes(todoId)) {
        const index = readNewAlarms.value.indexOf(todoId)
        const spliced = readNewAlarms.value.splice(index, 1)
        if (spliced?.[0]) readNewAlarms.value.unshift(spliced[0])
      } else if (readNewAlarms.value?.length)
        readNewAlarms.value = [todoId, ...readNewAlarms.value]
      else readNewAlarms.value = [todoId]
    }
    const removeReadNewAlarms = (todoId: number) =>
      (readNewAlarms.value = readNewAlarms.value?.filter(
        (alarm) => alarm !== todoId
      ))

    const hasUnReadNewAlarms = computed(() =>
      newAlarms.value?.find((alarm) => !readNewAlarms.value?.includes(alarm))
    )

    const registAlarm = (registAlarmDTO: RegistAlarmDTO) =>
      alarmApi.registAlarm(registAlarmDTO)

    const unregistAlarm = (deviceId: string, todoId: number) =>
      alarmApi.unregistAlarm(deviceId, todoId)

    return {
      newAlarms,
      addNewAlarm,
      removeNewAlarm,

      readNewAlarms,
      addReadNewAlarm,
      removeReadNewAlarms,
      hasUnReadNewAlarms,

      registAlarm,
      unregistAlarm,
    }
  },
  {
    persist: {
      paths: ['newAlarms', 'readNewAlarms'],
      storage: persistedState.cookiesWithOptions({
        expires: etcUtil.getCookieExpires(),
      }),
    },
  }
)
