import { getCookie } from 'h3'
import etcUtil from '~/utils/etc'

import en from './en.json'
import ko from './ko.json'
import jp from './jp.json'

export default defineI18nConfig(() => {
  const event = useRequestEvent()

  return {
    legacy: false,
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'ko', iso: 'ko-KR', name: '한국어' },
      { code: 'jp', iso: 'ja-JP', name: '日本語' },
    ],
    locale: process.client
      ? JSON.parse(etcUtil.getCookie('storage') || '{}')?.language || 'en'
      : JSON.parse(getCookie(event, 'storage') || '{}')?.language || 'en',
    messages: {
      'en-US': en,
      'ko-KR': ko,
      'ja-JP': ko,
      en,
      ko,
      jp,
    },
  }
})
