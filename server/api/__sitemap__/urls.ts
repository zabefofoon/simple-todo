import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/database.types'

import enMessages from '~/i18n/en.json'
import jaMessages from '~/i18n/jp.json'
import koMessages from '~/i18n/ko.json'

export default defineSitemapEventHandler(async (event) => {
  const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON
  )

  const { data } = await supabase
    .from('Posts')
    .select('id, public, path, image, created_at')
    .filter('public', 'eq', true)

  const en =
    data?.map((item) => {
      return {
        loc: `/news/${enMessages[item.path]}`,
        lastmod: new Date(item.created_at),
        images: [item.image],
        _sitemap: 'en-US',
      }
    }) ?? []

  const ko =
    data?.map((item) => {
      return {
        loc: `/ko/news/${koMessages[item.path]}`,
        lastmod: new Date(item.created_at),
        images: [item.image],
        _sitemap: 'ko-KR',
      }
    }) ?? []

  const ja =
    data?.map((item) => {
      return {
        loc: `/ja/news/${jaMessages[item.path]}`,
        lastmod: new Date(item.created_at),
        images: [item.image],
        _sitemap: 'ja-JP',
      }
    }) ?? []

  return [...en, ...ko, ...ja]
})
