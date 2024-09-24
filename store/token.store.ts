import { defineStore } from 'pinia'
import etcUtil from '~/utils/etc'

export const useRefreshTokenStore = defineStore(
  'refreshToken',
  () => {
    const googleRefreshToken = ref('')
    const setGoogleRefreshToken = (value: string) =>
      (googleRefreshToken.value = value)

    return {
      googleRefreshToken,
      setGoogleRefreshToken,
    }
  },
  {
    persist: {
      paths: ['googleRefreshToken'],
      storage: persistedState.cookiesWithOptions({
        expires: etcUtil.getCookieExpires(),
      }),
    },
  }
)
