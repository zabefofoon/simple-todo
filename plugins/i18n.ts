export default defineNuxtPlugin((nuxt) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const i18n = nuxt.$i18n as any

  i18n.te = (key: string, locale?: string): boolean => {
    const effectiveLocale = locale && locale.length ? locale : i18n.locale.value
    return !!i18n.messages.value[effectiveLocale][key]
  }

  i18n.tm = (key: string, locale: string): string[] => {
    const effectiveLocale = locale && locale.length ? locale : i18n.locale.value
    const messages = i18n.messages.value[effectiveLocale]

    if (!i18n.te(key)) return []

    if (
      typeof messages[key].loc === 'object' &&
      Object.hasOwn(messages[key].loc, 'source')
    ) {
      return [messages[key].loc.source] as string[]
    }

    if (messages[key] == null) return []
    if (!Object.hasOwn(messages[key], 'map')) {
      if (
        Object.hasOwn(messages[key], 'b') &&
        Object.hasOwn(messages[key].b, 's')
      )
        return [messages[key].b.s]
    } else {
      return []
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (messages[key] as any[]).map((v) => {
      if (v == null) return ''
      if (v.loc == null) {
        if (Object.hasOwn(v, 'b') && Object.hasOwn(v.b, 's')) return v.b.s
      }

      return v.loc.source as string
    })
  }

  i18n.valueToKey = (value: string, locale: string): string | null => {
    const messages = i18n.messages.value[locale] // 현재 로케일의 번역 데이터 가져오기

    const findKey = (
      obj: Record<string, any>,
      searchValue: string
    ): string | null => {
      for (const [key, val] of Object.entries(obj)) {
        if (val === searchValue) {
          return key // 값이 일치하면 key 반환
        } else if (typeof val === 'object' && val !== null) {
          const nestedKey = findKey(val, searchValue) // 중첩된 객체 처리
          if (nestedKey) {
            return `${key}.${nestedKey}`
          }
        }
      }
      return null
    }

    return findKey(messages, value)
  }
})
