import ShortUniqueId from 'short-unique-id'

export const generateUniqueId = (): string => {
  const uId = new ShortUniqueId({
    length: 10,
    dictionary: 'alpha',
  })
  return uId.rnd()
}

export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

export const deepClone = <T>(data: T): T =>
  JSON.parse(JSON.stringify(data))
