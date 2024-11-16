import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/database.types'
import { Paginated } from '~/models/Paginated'
import { Post, PostBrief } from '~/models/Post'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON
)

export const useSupabase = () => {
  const getPosts = async (page = 0) => {
    const itemsPerPage = 20
    const start = page * itemsPerPage
    const end = start + itemsPerPage - 1

    const { data, error, count } = await supabase
      .from('Posts')
      .select('id, title, description, public, image, created_at', {
        count: 'exact',
      })
      .filter('public', 'eq', true)
      .order('created_at', { ascending: false })
      .range(start, end)

    if (error) throw error

    return Paginated.of({
      page,
      total: count ?? 0,
      data: data.map(PostBrief.of),
    })
  }

  const getPostsPreview = async (page = 0) => {
    const itemsPerPage = 20
    const start = page * itemsPerPage
    const end = start + itemsPerPage - 1

    const { data, error, count } = await supabase
      .from('Posts')
      .select('id, title, description, public, image, created_at', {
        count: 'exact',
      })
      .order('created_at', { ascending: false })
      .range(start, end)

    if (error) throw error

    return Paginated.of({
      page,
      total: count ?? 0,
      data: data.map(PostBrief.of),
    })
  }

  const getPostDetail = async (id: number) => {
    const { data, error } = await supabase
      .from('Posts')
      .select('id, title, description, image, created_at, pageData')
      .eq('id', id)
      .single()

    if (error) throw error

    return Post.of(data)
  }
  return {
    getPosts,
    getPostsPreview,
    getPostDetail,
  }
}
