import { createI18n } from 'vue-i18n'

import en from '~/i18n/en.json'
import ja from '~/i18n/jp.json'
import ko from '~/i18n/ko.json'

export default createI18n({
  legacy: false,
  locales: [
    { code: 'en', iso: 'en-US', name: 'English' },
    { code: 'ko', iso: 'ko-KR', name: '한국어' },
    { code: 'ja', iso: 'ja-JP', name: '日本語' },
  ],
  messages: {
    'en-US': en,
    'ko-KR': ko,
    'ja-JP': ja,
    en,
    ko,
    ja,
  },
})
