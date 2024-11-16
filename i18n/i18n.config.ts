import { getCookie } from 'h3'
import etcUtil from '~/utils/etc'

import en from './en.json'
import ja from './jp.json'
import ko from './ko.json'

export default defineI18nConfig(() => {
  const event = useRequestEvent()

  return {
    legacy: false,
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'ko', iso: 'ko-KR', name: '한국어' },
      { code: 'ja', iso: 'ja-JP', name: '日本語' },
    ],
    locale: import.meta.client
      ? JSON.parse(etcUtil.getCookie('storage') || '{}')?.language || 'en'
      : JSON.parse(getCookie(event, 'storage') || '{}')?.language || 'en',
    messages: {
      'en-US': en,
      'ko-KR': ko,
      'ja-JP': ja,
      en,
      ko,
      ja,
    },
  }
})
