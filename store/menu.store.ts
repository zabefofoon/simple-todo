import { defineStore } from 'pinia'
import { Menu } from '~/models/Menu'

export const useMenuStore = defineStore('menu', () => {
  const route = useRoute()
  const i18n = useI18n()

  const snbMenus = shallowRef([
    Menu.of({
      code: 'dashboard',
      name: 'Dashboard',
      href: '/',
      icon: 'icon-home',
    }),
    Menu.of({ code: 'todo', name: 'Todo', href: '/todo', icon: 'icon-file' }),
    Menu.of({
      code: 'calender',
      name: 'Calender',
      href: '/calender',
      icon: 'icon-calender',
    }),
    Menu.of({
      code: 'setting',
      name: 'Setting',
      href: '/setting',
      icon: 'icon-setting',
    }),
    Menu.of({
      code: 'guide',
      name: 'Guide',
      href: '/memoku',
      icon: 'icon-help',
    }),
  ])

  const appBarMenus = shallowRef([
    Menu.of({ name: i18n.t('Home'), href: '/', icon: 'icon-home' }),
    Menu.of({ name: i18n.t('Todo'), href: '/todo', icon: 'icon-file' }),
    Menu.of({
      name: i18n.t('Calender'),
      href: '/calender',
      icon: 'icon-calender',
    }),
    Menu.of({
      name: i18n.t('Setting'),
      href: '/setting',
      icon: 'icon-setting',
    }),
  ])

  const isCurrentHref = (path = '/') => {
    if (i18n.locale.value === i18n.defaultLocale) return path === route.path
    else if (path === '/') return `/${i18n.locale.value}` === route.path
    else return `/${i18n.locale.value}${path}` === route.path
  }

  return {
    snbMenus,
    appBarMenus,
    isCurrentHref,
  }
})
