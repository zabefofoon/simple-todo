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

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result as string)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob) // Blob을 Base64로 변환
  })
}

const base64ToBlob = (base64: string, mimeType = 'image/webp') => {
  // Base64 문자열에서 헤더 부분을 제거 (만약 포함되어 있다면)
  let byteString = atob(base64.split(',')[1])

  // 바이너리 데이터를 저장할 배열 생성
  let arrayBuffer = new ArrayBuffer(byteString.length)
  let uint8Array = new Uint8Array(arrayBuffer)

  // Base64 문자열을 바이너리로 변환하여 배열에 저장
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  // Blob 생성
  return new Blob([uint8Array], { type: mimeType })
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
  blobToBase64,
  base64ToBlob,
}
