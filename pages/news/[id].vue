<template>
  <NuxtLayout name="layout-landing">
    <MMRenderer
      :nodes="pageData?.nodes ?? []"
      :widget-groups="pageData?.widgetGroups ?? []"
      @click="interceptClick" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { MMRenderer } from '~/lib/mm'

const supabase = useSupabase()
const route = useRoute()
const i18n = useI18n()
const localePath = useLocalePath()

const { data, suspense } = useQuery({
  queryKey: ['getPostPageData', route.params.id],
  queryFn: () =>
    supabase.getPostDetail(
      `${i18n.valueToKey(route.params.id, i18n.locale.value)}`
    ),
  staleTime: 1000 * 60 * 10,
})
const { gtag } = useGtag()

await suspense()

const interceptClick = (e: Event) => {
  const target = e.target as HTMLElement
  if (target.dataset['link']) {
    navigateTo(localePath(target.dataset['link']))
    return
  }
}

const pageData = computed(() => {
  if (data.value?.pageData) {
    const value = JSON.parse(data.value.pageData)

    return {
      nodes: value.pages[0]?.nodes ?? [],
      widgetGroups: value.widgetGroups,
    }
  }
})

onMounted(() => {
  const title = i18n.te(data.value?.title ?? '')
    ? i18n.t(data.value?.title ?? '')
    : data.value?.title
  gtag('event', `뉴스 - ${title}`)
})

useHead({
  title: i18n.te(data.value?.title ?? '')
    ? i18n.t(data.value?.title ?? '')
    : data.value?.title,
  meta: [
    {
      name: 'description',
      content: i18n.te(data.value?.description ?? '')
        ? i18n.t(data.value?.description ?? '')
        : data.value?.description,
    },
    {
      property: 'og:title',
      content: i18n.te(data.value?.title ?? '')
        ? i18n.t(data.value?.title ?? '')
        : data.value?.title,
    },
    {
      property: 'og:description',
      content: i18n.te(data.value?.description ?? '')
        ? i18n.t(data.value?.description ?? '')
        : data.value?.description,
    },
    {
      property: 'og:image',
      content: data.value?.image ?? 'https://memoku.netlify.app/ogImage.png',
    },
  ],
})

watch(
  () => [i18n.locale.value, route.params.id],
  ([newLocale], [oldLocale, oldId]) => {
    if (newLocale !== oldLocale) {
      const key = i18n.valueToKey(oldId, oldLocale)
      navigateTo(
        decodeURI(localePath(`/news/${i18n.t(key)}`, newLocale as string)),
        {
          replace: true,
        }
      )
    }
  }
)
</script>
