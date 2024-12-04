<template>
  <div class="flex flex-col justify-center">
    <section
      class="relative | main-section | flex flex-col items-center justify-center | aspect-[1/1] lg:aspect-[16/9] max-h-[88vh]"
      property="mainContentOfPage">
      <img
        class="absolute z-0 bottom-0 lg:bottom-[unset] | pointer-events-none | w-[92%] aspect-[1920/1080]"
        src="~/assets/images/main.png"
        alt="Welcome to MEMOKU!"
        property="image" />
      <div class="relative | bg-white">
        <h2
          class="flex gap-1.5 | text-sm | absolute top-0 left-0 -translate-y-[100%]">
          <span
            class="text-white text-sm lg:text-md | rounded-full | px-1.5 py-0.5 | bg-[#eb4d4b]">
            #{{ i18n.t('TodoList') }}
          </span>
          <span
            class="text-white text-sm lg:text-md | rounded-full | px-1.5 py-0.5 bg-[#4834d4]">
            #{{ i18n.t('Reminder') }}
          </span>
          <span
            class="text-white text-sm lg:text-md | rounded-full | px-1.5 py-0.5 bg-[#6ab04c]">
            #{{ i18n.t('TaskManager') }}
          </span>
        </h2>
        <h1
          class="text-7xl lg:text-8xl font-bold tracking-tighter text-slate-900">
          MEMOKU
        </h1>
      </div>
    </section>
    <section
      class="flex flex-col items-center justify-center | aspect-[1/1] lg:aspect-[30/9]">
      <p
        class="relative z-1 | mt-8 px-8 | text-lg lg:text-2xl text-center | lg:w-[800px] leading-relaxed">
        {{ i18n.t('Induce1') }}
      </p>
      <NuxtLinkLocale
        to="/"
        class="relative z-1 text-white lg:text-xl | rounded-full | mt-8 px-8 py-2 bg-slate-800">
        {{ i18n.t('Induce2') }}
      </NuxtLinkLocale>
    </section>
    <section
      class="flex flex-col items-center justify-center gap-10 | px-4 py-24 | bg-slate-800">
      <ul class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 | lg:w-[80%]">
        <li
          class="flex flex-col gap-4 lg:gap-8 | w-full | border border-slate-500 rounded-lg | p-4 lg:py-10 lg:px-6"
          typeof="Service">
          <div
            class="text-center lg:text-[24px] | flex items-center justify-center gap-2">
            <i class="icon icon-post flex-shrink-0 | text-white"></i>
            <span class="text-white" property="name">{{
              i18n.t('EasyMemoDescription')
            }}</span>
          </div>
          <div
            class="text-center lg:text-[18px] text-white"
            property="description">
            {{ i18n.t('EasyMemoDescriptionGuide') }}
          </div>
        </li>
        <li
          class="flex flex-col gap-4 lg:gap-8 | w-full | border border-slate-500 rounded-lg | p-4 lg:py-10 lg:px-6"
          typeof="Service">
          <div
            class="text-center lg:text-[24px] | flex items-center justify-center gap-2">
            <i class="icon icon-notification flex-shrink-0 | text-white"></i>
            <span class="text-white" property="name">{{
              i18n.t('NotificationDescription')
            }}</span>
          </div>
          <div
            class="text-center lg:text-[18px] text-white"
            property="description">
            {{ i18n.t('NotificationDescriptionDescription') }}
          </div>
        </li>
        <li
          class="flex flex-col gap-4 lg:gap-8 | w-full | border border-slate-500 rounded-lg | p-4 lg:py-10 lg:px-6"
          typeof="Service">
          <div
            class="text-center lg:text-[24px] | flex items-center justify-center gap-2">
            <i class="icon icon-tag flex-shrink-0 | text-white"></i>
            <span class="text-white" property="name">{{
              i18n.t('TagDescription')
            }}</span>
          </div>
          <div
            class="text-center lg:text-[18px] text-white"
            property="description">
            {{ i18n.t('TagDescriptionGuide') }}
          </div>
        </li>
        <li
          class="flex flex-col gap-4 lg:gap-8 | w-full | border border-slate-500 rounded-lg | p-4 lg:py-10 lg:px-6"
          typeof="Service">
          <div
            class="text-center lg:text-[24px] | flex items-center justify-center gap-2">
            <i class="icon icon-date flex-shrink-0 | text-white"></i>
            <span class="text-white" property="name">{{
              i18n.t('DateDescription')
            }}</span>
          </div>
          <div
            class="text-center lg:text-[18px] text-white"
            property="description">
            {{ i18n.t('DateDescriptionGuide') }}
          </div>
        </li>
        <li
          class="flex flex-col gap-4 lg:gap-8 | w-full | border border-slate-500 rounded-lg | p-4 lg:py-10 lg:px-6"
          typeof="Service">
          <div
            class="text-center lg:text-[24px] | flex items-center justify-center gap-2">
            <i class="icon icon-theme flex-shrink-0 | text-white"></i>
            <span class="text-white" property="name">{{
              i18n.t('ThemeDescription')
            }}</span>
          </div>
          <div
            class="text-center lg:text-[18px] text-white"
            property="description">
            {{ i18n.t('ThemeDescriptionGuide') }}
          </div>
        </li>
        <li
          class="flex flex-col gap-4 lg:gap-8 | w-full | border border-slate-500 rounded-lg | p-4 lg:py-10 lg:px-6"
          typeof="Service">
          <div
            class="text-center lg:text-[24px] | flex items-center justify-center gap-2">
            <i class="icon icon-chart flex-shrink-0 | text-white"></i>
            <span class="text-white" property="name">{{
              i18n.t('AnalisysDescription')
            }}</span>
          </div>
          <div
            class="text-center lg:text-[18px] text-white"
            property="description">
            {{ i18n.t('AnalisysDescriptionGuide') }}
          </div>
        </li>
        <li
          class="flex flex-col gap-4 lg:gap-8 | w-full | border border-slate-500 rounded-lg | p-4 lg:py-10 lg:px-6"
          typeof="Service">
          <div
            class="text-center lg:text-[24px] | flex items-center justify-center gap-2">
            <i class="icon icon-offline flex-shrink-0 | text-white"></i>
            <span class="text-white" property="name">{{
              i18n.t('OfflineDescription')
            }}</span>
          </div>
          <div
            class="text-center lg:text-[18px] text-white"
            property="description">
            {{ i18n.t('OfflineDescriptionGuide') }}
          </div>
        </li>
      </ul>
    </section>
    <section
      class="flex items-center justify-center flex-col lg:flex-row gap-12 lg:gap-0 | py-20">
      <div>
        <img
          src="~/assets/images/add_home.png"
          class="w-full"
          alt="Responsive MEMOKU"
          property="image" />
      </div>
      <div class="flex flex-col gap-3 | w-full | px-8">
        <h3 class="text-2xl lg:text-3xl leading-normal | lg:w-1/2">
          {{ i18n.t('Induce3') }}
        </h3>
        <p class="text-lg lg:text-xl leading-normal | lg:w-1/2">
          {{ i18n.t('Induce4') }}
        </p>
        <NuxtLinkLocale
          to="/"
          class="lg:w-fit | relative z-1 text-white lg:text-xl text-center | rounded-full | mt-4 px-8 py-2 bg-slate-800">
          {{ i18n.t('Induce5') }}
        </NuxtLinkLocale>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'layout-landing',
})
const i18n = useI18n()

useHead({
  title: i18n.t('PageTitle'),
  meta: [
    {
      name: 'description',
      content: i18n.t('PageDescription'),
    },
    {
      name: 'keywords',
      content: i18n.t('PageKeywords'),
    },
    {
      property: 'og:title',
      content: i18n.t('PageTitle'),
    },
    {
      property: 'og:description',
      content: i18n.t('PageDescription'),
    },
  ],
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
          {
            '@type': 'WebApplicationFeature',
            name: i18n.t('PageLDFeatureName7'),
            description: i18n.t('PageLDFeatureDescription7'),
          },
        ],
      }),
    },
  ],
})
</script>
