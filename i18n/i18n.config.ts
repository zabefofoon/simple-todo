import en from './en.json'
import ko from './ko.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'ko', iso: 'ko-KR', name: '한국어' },
    ],
    defaultLocale: 'en',
    messages: {
      'en-US': en,
      'ko-KR': ko,
      en,
      ko
    }
  }))