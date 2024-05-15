import type { RegistAlarmDTO } from '~/models/Alarm'

export default {
  registAlarm: (registAlarmDTO: RegistAlarmDTO) =>
    $fetch('/api/alarm', {
      method: 'post',
      body: registAlarmDTO,
    }),

  unregistAlarm: (deviceId: string, todoId: number) =>
    $fetch('/api/alarm', {
      method: 'delete',
      params: {deviceId, todoId}
    }),
}
