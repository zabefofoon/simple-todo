<template>
  <main class="relative | overflow-hidden | text-slate-800">
    <img
      class="w-[200px] lg:w-auto | absolute right-0 top-0 translate-x-1/2 lg:translate-x-1/3 -translate-y-1/2"
      src="https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/blob.webp"
      :alt="i18n.t('Induce1')" />
    <img
      class="w-[200px] lg:w-auto | absolute left-0 bottom-0 -translate-x-1/3 translate-y-2/3 lg:translate-y-[800px]"
      src="https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/blob.webp"
      :alt="i18n.t('Induce1')" />
    <img
      class="w-[200px] lg:w-auto | absolute right-0 bottom-0 translate-x-1/3 translate-y-2/3 lg:translate-y-[800px] rotate-90"
      src="https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/blob.webp"
      :alt="i18n.t('Induce1')" />
    <section
      class="max-w-[440px] lg:max-w-[1400px] | mx-auto px-[16px] lg:px-[0] pt-[80px]">
      <p class="text-[13px] text-white | flex gap-2 mb-[12px]">
        <span class="bg-[#eb4d4b] px-2 py-0.5 | rounded-full">
          #{{ i18n.t('TodoList') }}
        </span>
        <span class="bg-[#4834d4] px-2 py-0.5 | rounded-full">
          #{{ i18n.t('Reminder') }}
        </span>
        <span class="bg-[#6ab04c] px-2 py-0.5 | rounded-full">
          #{{ i18n.t('TaskManager') }}
        </span>
      </p>
      <h1
        class="leading-tight text-[40px] lg:text-[48px] font-bold | mb-[24px]"
        v-html="i18n.t('Induce1')"></h1>
      <p
        class="text-[20px] lg:text-[28px] mb-[24px]"
        v-html="i18n.t('Induce2')"></p>
      <NuxtLinkLocale
        class="block | w-fit | px-12 py-1.5 mb-[60px] | bg-slate-900 | rounded-lg text-center"
        to="/">
        <span
          class="whitespace-nowrap lg:text-[18px] text-white"
          v-t="'Induce3'">
        </span>
      </NuxtLinkLocale>
    </section>

    <section
      class="max-w-[440px] lg:max-w-[1400px] | mx-auto pb-[40px] px-[16px] lg:px-[0]">
      <div class="relative pointer-events-none">
        <UICarousel
          class="bg-slate-800 border-4 border-slate-800 rounded-lg | overflow-hidden w-[90%] aspect-[1080/1920] lg:aspect-video"
          use-dots
          loop
          autoplay>
          <UICarouselSlide v-for="(item, index) in slides" :key="index">
            <picture>
              <source media="(min-width: 1024px)" :srcset="item.pc" />
              <source media="(max-width: 1023px)" :srcset="item.mo" />
              <img class="blockw-full" :src="item.mo" :alt="item.alt" />
            </picture>
          </UICarouselSlide>
        </UICarousel>
        <UICarousel
          class="!absolute bottom-8 right-0 | rounded-lg overflow-hidden | w-[240px] aspect-video lg:aspect-[1080/1920]"
          style="box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5)"
          loop
          autoplay>
          <UICarouselSlide v-for="(item, index) in slides" :key="index">
            <picture>
              <source media="(min-width: 1024px)" :srcset="item.mo" />
              <source media="(max-width: 1023px)" :srcset="item.pc" />
              <img
                class="blockw-full"
                :src="item.pc"
                :alt="item.alt"
                loading="lazy" />
            </picture>
          </UICarouselSlide>
        </UICarousel>
      </div>
    </section>

    <section
      class="max-w-[440px] lg:max-w-[1400px] | flex flex-col items-center justify-center gap-10 | mx-auto py-[40px] lg:py-[60px] px-[16px]">
      <ul class="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
        <li
          v-for="(figure, index) in figures"
          :key="index"
          class="bg-slate-100 | flex flex-col gap-4 | rounded-lg | p-4 lg:p-6"
          typeof="Service">
          <div class="flex items-center gap-2">
            <i
              class="icon flex-shrink-0 | lg:text-[24px]"
              :class="figure.icon"></i>
            <span class="lg:text-[18px]" property="name" v-t="figure.title">
            </span>
          </div>
          <div
            class="lg:text-[18px]"
            property="description"
            v-t="figure.description"></div>
        </li>
      </ul>
    </section>

    <section
      v-if="settingStore.screen === 'lg'"
      class="flex flex-col gap-[32px] | max-w-[440px] lg:max-w-[1400px] | mx-auto py-[24px] lg:py-[40px] px-[16px]">
      <div v-for="(item, index) in newsSections" :key="index">
        <div class="flex items-start flex-col lg:flex-row | w-full">
          <div class="shrink-0 lg:w-1/2 | flex flex-col gap-[24px]">
            <h2
              class="shrink-0 w-full | leading-tight text-[20px] lg:text-[32px] font-bold"
              v-html="item.title"></h2>
            <p class="lg:text-[20px]" v-html="item.description"></p>
            <NuxtLinkLocale
              class="lg:w-fit | px-16 py-1.5 | border-2 border-slate-300 rounded-lg | text-center"
              :to="item.href">
              <span class="whitespace-nowrap text-[18px]" v-t="'More'"></span>
            </NuxtLinkLocale>
          </div>
          <img
            v-if="settingStore.screen === 'lg'"
            class="lg:w-1/2 block rounded-lg"
            :src="item.image"
            :alt="item.title"
            loading="lazy" />
        </div>
      </div>
    </section>
    <section v-else>
      <UICarousel
        class="max-w-[440px] | mx-auto py-[40px] px-[16px]"
        drag-free
        :perview="1.1"
        gap="12px">
        <UICarouselSlide
          v-for="(item, index) in newsSections"
          :key="index"
          class="flex flex-col | border rounded-lg | overflow-hidden">
          <img
            :src="item.image"
            :alt="item.title"
            class="block"
            loading="lazy" />
          <div class="p-3 | h-full | flex flex-col">
            <h4
              class="mb-[12px] | font-bold text-[20px]"
              v-html="item.title"></h4>
            <p v-html="item.description" class="mb-[20px]"></p>
            <NuxtLink
              class="block | border border-slate-300 rounded-lg | py-1.5 px-8 mt-auto | text-center">
              <span class="text-sm" v-t="'More'"></span>
            </NuxtLink>
          </div>
        </UICarouselSlide>
      </UICarousel>
    </section>
    <section
      class="max-w-[440px] lg:max-w-[1400px] | flex flex-col lg:flex-row items-center gap-[32px] | mx-auto | py-[40px] lg:py-[80px] px-[16px]">
      <div class="w-full lg:w-1/2">
        <h2
          class="leading-tight text-[20px] lg:text-[32px] font-bold | mb-[12px]">
          <span class="text-[24px] lg:text-[40px] font-bold" v-t="'Induce4'">
          </span>
        </h2>
        <p class="lg:text-[24px] mb-[20px]" v-html="i18n.t('Induce5')"></p>
        <NuxtLinkLocale
          class="block | lg:w-fit | px-12 py-1.5 | bg-slate-900 | rounded-lg text-center"
          to="/">
          <span
            class="whitespace-nowrap text-[18px] text-white"
            v-t="'Induce3'">
          </span>
        </NuxtLinkLocale>
      </div>
      <img
        class="w-full lg:w-1/2"
        src="~/assets/images/add_home.png"
        loading="lazy" />
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'layout-landing',
})
const i18n = useI18n()
const settingStore = useSettingStore()
const storageStore = useStorageStore()

const slides = computed(() => [
  {
    pc: 'https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/capture_pc_dashboard.webp',
    mo: 'https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/capture_mo_dashboard.webp',
    alt: i18n.t('Induce2'),
  },
  {
    pc: 'https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/capture_pc_todo.webp',
    mo: 'https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/capture_mo_todo.webp',
    alt: i18n.t('TagDescriptionGuide'),
  },
  {
    pc: 'https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/capture_pc_calendar.webp',
    mo: 'https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/capture_mo_calendar.webp',
    alt: i18n.t('DateDescriptionGuide'),
  },
  {
    pc: 'https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/capture_pc_calendar2.webp',
    mo: 'https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/capture_mo_calendar2.webp',
    alt: i18n.t('EasyMemoDescriptionGuide'),
  },
  {
    pc: 'https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/capture_pc_todo2.webp',
    mo: 'https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/capture_mo_todo2.webp',
    alt: i18n.t('Induce1'),
  },
])

const newsSections = computed(() => {
  let linkHref = '/news/Google-Integration'
  if (storageStore.language === 'ko') linkHref = '/ko/news/구글-연동'
  else if (storageStore.language === 'ja') linkHref = '/ja/news/Google連携'

  let homeHref = '/news/Add-to-Home'
  if (storageStore.language === 'ko') homeHref = '/ko/news/홈화면-추가'
  else if (storageStore.language === 'ja') homeHref = '/ja/news/ホームに追加'

  let tagHref = '/news/tags-calendar-manage'
  if (storageStore.language === 'ko') tagHref = '/ko/news/태그-달력-관리'
  else if (storageStore.language === 'ja')
    tagHref = '/ja/news/タグ-カレンダー-管理'

  return [
    {
      title: i18n.t('Home_news_link_title'),
      description: i18n.t('Home_news_link_desc'),
      image:
        'https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/link.webp',
      href: linkHref,
    },
    {
      title: i18n.t('Home_news_home_title'),
      description: i18n.t('Home_news_home_desc'),
      image:
        'https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/home.webp',
      href: homeHref,
    },
    {
      title: i18n.t('Home_news_tags_title'),
      description: i18n.t('Home_news_tags_desc'),
      image:
        'https://hopxvfhalrmkomnxznpf.supabase.co/storage/v1/object/public/memoku-bucket/public/calendar.webp',
      href: tagHref,
    },
  ]
})

const figures = computed(() => [
  {
    icon: 'icon-post',
    title: 'EasyMemoDescription',
    description: 'EasyMemoDescriptionGuide',
  },
  {
    icon: 'icon-notification',
    title: 'NotificationDescription',
    description: 'NotificationDescriptionDescription',
  },
  {
    icon: 'icon-tag',
    title: 'TagDescription',
    description: 'TagDescriptionGuide',
  },
  {
    icon: 'icon-date',
    title: 'DateDescription',
    description: 'DateDescriptionGuide',
  },
  {
    icon: 'icon-theme',
    title: 'ThemeDescription',
    description: 'ThemeDescriptionGuide',
  },
  {
    icon: 'icon-chart',
    title: 'AnalisysDescription',
    description: 'AnalisysDescriptionGuide',
  },
])

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: i18n.t('PageLDUrl'),
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        name: 'MEMOKU',
        url: 'https://memoku.netlify.app/memoku',
        description: i18n.t('PageLDDescription'),
        mainEntity: {
          '@type': 'WebApplication',
          name: 'MEMOKU',
          operatingSystem: 'All',
          applicationCategory: 'Productivity',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            category: 'Free',
          },
        },
        about: {
          '@type': 'Thing',
          name: i18n.t('PageLDAboutName'),
          description: i18n.t('PageLDAboutDescription'),
        },
        creator: {
          '@type': 'Person',
          name: 'saaang',
          url: 'https://www.threads.net/@sangwwooo/post/C7E92AAv_pz',
        },
        potentialAction: {
          '@type': 'Action',
          name: i18n.t('PageLDPotentialAction'),
          target: i18n.t('PageLDUrl'),
        },
        screenshot: '/screenshot-2.png',
        featureList: [
          {
            '@type': 'WebApplicationFeature',
            name: i18n.t('PageLDFeatureName1'),
            description: i18n.t('PageLDFeatureDescription1'),
          },
          {
            '@type': 'WebApplicationFeature',
            name: i18n.t('PageLDFeatureName2'),
            description: i18n.t('PageLDFeatureDescription2'),
          },
          {
            '@type': 'WebApplicationFeature',
            name: i18n.t('PageLDFeatureName3'),
            description: i18n.t('PageLDFeatureDescription3'),
          },
          {
            '@type': 'WebApplicationFeature',
            name: i18n.t('PageLDFeatureName4'),
            description: i18n.t('PageLDFeatureDescription4'),
          },
          {
            '@type': 'WebApplicationFeature',
            name: i18n.t('PageLDFeatureName5'),
            description: i18n.t('PageLDFeatureDescription5'),
          },
          {
            '@type': 'WebApplicationFeature',
            name: i18n.t('PageLDFeatureName6'),
            description: i18n.t('PageLDFeatureDescription6'),
          },
        ],
      }),
    },
  ],
}))
</script>
