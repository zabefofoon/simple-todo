import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/database.types'

export default defineSitemapEventHandler(async () => {
  const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON
  )

  const { data } = await supabase
    .from('Posts')
    .select('id, public')
    .filter('public', 'eq', true)

  return (
    data?.map((item) => ({
      loc: `/news/${item.id}`,
      _i18nTransform: true,
    })) ?? []
  )
})
