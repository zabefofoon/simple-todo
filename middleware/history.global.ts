export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const { isAndroid } = useDevice()
    const isPWA = window.matchMedia('(display-mode: standalone)').matches
    if (!isPWA || !isAndroid) return

    // 현재 히스토리 상태에 `f`가 없을 때
    if (from.name && !from.query.f && !to.query.f) {
      return navigateTo(
        {
          ...to,
          query: { ...to.query, f: '1' },
        },
        { replace: false }
      )
    }

    // 쿼리에 `t` 값이 있을 때 히스토리 상태 복원
    if (to.query.t) {
      setTimeout(() => navigateTo(String(to.query.t), { replace: false }), 10)
    }
  }
})
