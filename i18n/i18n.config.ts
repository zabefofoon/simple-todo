import en from './en.json'
import ja from './jp.json'
import ko from './ko.json'

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'ko', iso: 'ko-KR', name: '한국어' },
      { code: 'ja', iso: 'ja-JP', name: '日本語' },
    ],
    locale: useCookie('storage').value?.language ?? 'en',
    messages: {
      'en-US': en,
      'ko-KR': ko,
      'ja-JP': ja,
      en,
      ko,
      ja,
    },
    warnHtmlMessage: false,
  }
})
