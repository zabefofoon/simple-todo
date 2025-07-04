<template>
  <div
    class="sticky top-0 z-10 | hidden lg:flex items-center gap-1 | px-4 py-2 | bg-theme-3 border-b border-theme">
    <SearchInputButton />
    <DarkModeButton />
    <NotificationButton />
  </div>
  <div class="flex flex-col gap-4 | p-4">
    <h3
      class="pb-2 text-[18px] lg:text-[20px] | font-bold text-theme"
      v-t="'NewsTitle'"></h3>
    <div
      class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-3 gap-y-5 lg:gap-x-4 lg:gap-y-6">
      <NuxtLinkLocale
        v-for="post in postList"
        :key="post.id"
        :to="post.id === -1 ? undefined : `/news/${i18n.t(post.path)}`">
        <figure
          v-if="!post.isEmpty"
          class="w-full rounded-lg | border border-theme | bg-theme-3 | overflow-hidden">
          <img
            :src="post.image ?? ''"
            class="w-full aspect-square | object-cover | border-b border-theme"
            :alt="i18n.t(post.title ?? '')"
            loading="lazy" />
          <figcaption class="px-3 pt-3 pb-4 | flex flex-col | leading-tight">
            <h4
              class="truncate-2 text-pretty font-bold dark:text-white | mb-1.5"
              v-t="post.title"></h4>
            <p
              class="truncate-2 text-pretty | text-sm text-slate-400 | mb-1.5"
              v-t="post.description"></p>
            <p
              class="overflow-hidden | whitespace-nowrap text-ellipsis | text-[11px] text-slate-400">
              {{
                etcUtil.formatDate(post.created_at ?? 0, storageStore.language)
              }}
            </p>
          </figcaption>
        </figure>
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PostBrief } from '~/models/Post'

import etcUtil from '~/utils/etc'

definePageMeta({
  layout: 'layout-basic',
  buttons: ['new'],
})

const storageStore = useStorageStore()
const i18n = useI18n()
const supabase = useSupabase()
const route = useRoute()
const { data: posts, suspense } = useQuery({
  queryKey: ['getPosts'],
  queryFn: () =>
    route.query.preview ? supabase.getPostsPreview() : supabase.getPosts(),
  staleTime: 1000 * 60 * 60,
})

await suspense()

const postList = computed(() => {
  const data = posts.value?.data ?? []

  return [
    ...data,
    ...Array.from({ length: 8 - data.length }, () => PostBrief.empty()),
  ]
})
</script>
