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

const formatDate = (date: number, locale: 'ko' | 'en' | 'ja'): string => {
  // 날짜 객체로 변환
  const dateObj = new Date(date)

  // 로케일별 포맷 옵션
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: locale === 'ko' ? '2-digit' : 'long', // 한국어는 숫자로, 나머지는 문자로
    day: '2-digit',
  }

  // 일본어는 추가적으로 'era'를 포함
  if (locale === 'ja') {
    options.era = 'short'
  }

  // Intl.DateTimeFormat으로 포맷
  return new Intl.DateTimeFormat(locale, options).format(dateObj)
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
  formatDate,
}
