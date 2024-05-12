import type { RegistAlarmDTO } from '~/models/Alarm'

export default {
  registAlarm: (registAlarmDTO: RegistAlarmDTO) =>
    $fetch(import.meta.env.VITE_ALARM_SERVER, {
      method: 'post',
      body: registAlarmDTO,
    }),

  unregistAlarm: (deviceId: string, todoId: number) =>
    $fetch(import.meta.env.VITE_ALARM_SERVER, {
      method: 'delete',
      params: {deviceId, todoId}
    }),
}
