import { getCookie } from 'h3'

import en from './en.json'
import ko from './ko.json'

export default defineI18nConfig(() => {
  const event = useRequestEvent()

  return {
    legacy: false,
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'ko', iso: 'ko-KR', name: '한국어' },
    ],
    locale: process.client
      ? localStorage.getItem('language')?.replace(/[\'|\"]/g, '') || 'en'
      : getCookie(event, 'i18n_redirected'),
    messages: {
      'en-US': en,
      'ko-KR': ko,
      en,
      ko,
    },
  }
})
