import type { LocationQuery, Router } from 'vue-router'

export default {
  checkFirstEntered: (router: Router): boolean => {
    const isRefreshed = router.options.history.state.replaced as boolean
    const isFirstEntered = !router.options.history.state

    return isFirstEntered || isRefreshed
  },

  queryToString: (query: LocationQuery): string => {
    return Object.keys(query)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            query[key] as string
          )}`
      )
      .join('&')
  },
}
