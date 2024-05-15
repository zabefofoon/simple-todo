import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

router.post(
  '/alarm',
  defineEventHandler(async (event) => {
    const body = await readBody(event)
    await $fetch(`${process.env.VITE_ALARM_SERVER}`, {
      method: 'post',
      body,
    })
    return 'registed'
  })
)

router.delete(
  '/alarm',
  defineEventHandler(async (event) => {
    const { deviceId, todoId } = getQuery(event)
    await $fetch(`${process.env.VITE_ALARM_SERVER}`, {
      method: 'delete',
      params: { deviceId, todoId },
    })
    return 'unregisted'
  })
)

export default useBase('/api', router.handler)
