<template>
  <header
    class="flex items-center gap-1.5 | px-4 lg:px-8 py-2 | border-b | sticky top-0 left-0 z-10 | bg-white"
    vocab="http://schema.org/"
    typeof="WebPage">
    <NuxtLink
      class="block | w-full | font-bold"
      to="/"
      area-label="Home"
      property="url">
      <div class="flex items-center justify-center gap-1 | w-fit">
        <img
          class="w-[24px] aspect-square"
          src="~/assets/images/logo.svg"
          alt="MEMOKU"
          property="logo" />
        <span property="name">MEMOKU</span>
      </div>
    </NuxtLink>
    <div>
      <select
        class="text-sm"
        v-model="storageStore.language"
        @change="changeLanguage">
        <option value="en">
          English
        </option>
        <option value="ko">
          한국어
        </option>
        <option value="jp">
          日本語
        </option>
      </select>
    </div>
  </header>
  <div class="flex flex-col justify-center">
    <section
      class="relative | main-section | flex flex-col items-center justify-center | aspect-[1/1] lg:aspect-[16/9] max-h-[88vh]"
      property="mainContentOfPage">
      <img
        class="absolute z-0 bottom-0 lg:bottom-[unset] | pointer-events-none | w-[92%]"
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
      <NuxtLink
        to="/"
        class="relative z-1 text-white lg:text-xl | rounded-full | mt-8 px-8 py-2 bg-slate-800">
        {{ i18n.t('Induce2') }}
      </NuxtLink>
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
        <NuxtLink
          to="/"
          class="lg:w-fit | relative z-1 text-white lg:text-xl text-center | rounded-full | mt-4 px-8 py-2 bg-slate-800">
          {{ i18n.t('Induce5') }}
        </NuxtLink>
      </div>
    </section>
  </div>
  <footer class="bg-slate-950 | px-4 lg:px-8 py-6 | flex justify-between gap-4">
    <h2 class="flex items-center gap-2">
      <span class="text-white" property="name">MEMOKU</span>
      <span class="hidden lg:inline ml-auto | text-xs text-white"
        >#{{ i18n.t('TodoList') }}</span
      >
      <span class="hidden lg:inline text-xs text-white"
        >#{{ i18n.t('Reminder') }}
      </span>
      <span class="hidden lg:inline text-xs text-white"
        >#{{ i18n.t('TaskManager') }}
      </span>
    </h2>
    <div class="flex items-center gap-3">
      <NuxtLink
        to="https://www.threads.net/@sangwwooo/post/C7E92AAv_pz"
        target="_blank"
        class="flex ml-auto">
        <i class="icon icon-threads | text-white text-xl"></i>
      </NuxtLink>
      <NuxtLink
        to="https://zabefofoon.tistory.com/24"
        target="_blank"
        class="flex">
        <i class="icon icon-tistory | text-white text"></i>
      </NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Language } from '~/models/Setting'
import { useStorageStore } from '~/store/storage.store'

const storageStore = useStorageStore()
const i18n = useI18n()

const changeLanguage = (event: Event) => {
  const value = <Language>(<HTMLSelectElement>event.target).value
  storageStore.setLanguage(value)
}

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://memoku.netlify.app/memoku'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        name: 'MEMOKU',
        url: 'https://memoku.netlify.app/memoku',
        description:
          'MEMOKU is a task management web app that helps you manage tasks easily with features like easy memo, notifications, tags, date management, dark mode, task analysis, and offline mode.',
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
          name: 'Task Management',
          description:
            'Manage tasks, set reminders, and organize your life with MEMOKU.',
        },
        creator: {
          '@type': 'Person',
          name: 'saaang',
          url: 'https://www.threads.net/@sangwwooo/post/C7E92AAv_pz',
        },
        potentialAction: {
          '@type': 'Action',
          name: 'Get Started',
          target: 'https://memoku.netlify.app/',
        },
        screenshot: '/screenshot-2.png',
        featureList: [
          {
            '@type': 'WebApplicationFeature',
            name: 'Easy Memo',
            description: 'Can easily memo your tasks with a few clicks.',
          },
          {
            '@type': 'WebApplicationFeature',
            name: 'Notification',
            description:
              "Can set notifications so you don't miss important tasks.",
          },
          {
            '@type': 'WebApplicationFeature',
            name: 'Tag',
            description: 'Can set tags to easily classify and manage tasks.',
          },
          {
            '@type': 'WebApplicationFeature',
            name: 'Date',
            description: 'Can register tasks by date for planned management.',
          },
          {
            '@type': 'WebApplicationFeature',
            name: 'Theme',
            description:
              'Choose between Light Mode and Dark Mode according to your preference.',
          },
          {
            '@type': 'WebApplicationFeature',
            name: 'Analysis',
            description: 'Provides statistics by simply analyzing your tasks.',
          },
          {
            '@type': 'WebApplicationFeature',
            name: 'Offline',
            description:
              "Catch up on your tasks even when you're offline with our app.",
          },
        ],
      }),
    },
  ],
})
</script>
