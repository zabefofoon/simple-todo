import ShortUniqueId from 'short-unique-id'

export const generateUniqueId = (): string => {
  const uId = new ShortUniqueId({
    length: 10,
    dictionary: 'alpha',
  })
  return uId.rnd()
}

export const generateLongUniqueId = (): string => {
  const uId = new ShortUniqueId({
    length: 30,
  })
  return uId.rnd()
}

export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

export const deepClone = <T>(data: T): T => JSON.parse(JSON.stringify(data))

export const getCookie = (name: string) => {
  const cookieString = decodeURIComponent(document.cookie)
  const cookies = cookieString.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1)
    }
  }

  return null
}

export const setCookie = (name: string, value: string, days: number) => {
  var expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + value + expires + '; path=/'
}

const getCookieExpiresNYears = (year: number) => {
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + year)
  return expires
}

const getCookieExpiresNDays = (days: number) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  return date
}

export default {
  generateUniqueId,
  generateLongUniqueId,
  sleep,
  deepClone,
  getCookie,
  setCookie,
  getCookieExpiresNYears,
  getCookieExpiresNDays,
}
