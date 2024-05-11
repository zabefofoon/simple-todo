import { defineStore } from 'pinia'
import alarmApi from '~/api/alarm.api'
import type { RegistAlarmDTO } from '~/models/Alarm'

export const useAlarmStore = defineStore('alarm', () => {
  const registAlarm = (registAlarmDTO: RegistAlarmDTO) => {
    return alarmApi.registAlarm(registAlarmDTO)
  }
  return {registAlarm}
})
