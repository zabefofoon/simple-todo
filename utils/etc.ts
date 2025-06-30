import dayjs from 'dayjs'
import ShortUniqueId from 'short-unique-id'

export const escapeHTML = (html = '') => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return html.replace(/[&<>"']/g, (match: string) => map[match])
}

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

const formatDate = (date: number, locale: 'ko' | 'en' | 'ja'): string => {
  return ['ko', 'ja'].includes(locale)
    ? dayjs(date).format('YYYY.MM.DD')
    : dayjs(date).format('MMMM DD, YYYY')
}
export default {
  generateUniqueId,
  generateLongUniqueId,
  sleep,
  deepClone,
  setCookie,
  getCookieExpiresNYears,
  getCookieExpiresNDays,
  formatDate,
}
