import en from './en.json'
import ja from './jp.json'
import ko from './ko.json'

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: useCookie('storage').value?.language || 'en',
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
