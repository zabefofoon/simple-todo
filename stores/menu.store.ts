import { defineStore } from 'pinia'
import { Menu } from '~/models/Menu'

export const useMenuStore = defineStore('menu', () => {
  const route = useRoute()
  const localePath = useLocalePath()

  const snbMenus = computed<Menu[]>(() => {
    return [
      Menu.of({
        code: 'Dashboard',
        name: 'Dashboard',
        href: '/',
        icon: 'icon-home',
      }),
      Menu.of({ code: 'todo', name: 'Todo', href: '/todo', icon: 'icon-file' }),
      Menu.of({
        code: 'Calender',
        name: 'Calender',
        href: '/calender',
        icon: 'icon-calender',
      }),
      Menu.of({
        code: 'Setting',
        name: 'Setting',
        href: '/setting',
        icon: 'icon-setting',
      }),
      Menu.of({
        code: 'News',
        name: 'News',
        href: '/news',
        icon: 'icon-news',
      }),
      Menu.of({
        code: 'Guide',
        name: 'Guide',
        href: '/memoku',
        icon: 'icon-help',
      }),
    ]
  })

  const appBarMenus = computed<Menu[]>(() => {
    return [
      Menu.of({
        name: 'Home',
        href: '/',
        icon: 'icon-home',
        code: 'Home',
      }),
      Menu.of({
        name: 'Todo',
        href: '/todo',
        icon: 'icon-file',
        code: 'Todo',
      }),
      Menu.of({
        name: 'Calender',
        href: '/calender',
        icon: 'icon-calender',
        code: 'Calender',
      }),
      Menu.of({
        name: 'News',
        href: '/news',
        icon: 'icon-news',
        code: 'News',
      }),
      Menu.of({
        name: 'Setting',
        href: '/setting',
        icon: 'icon-setting',
        code: 'Setting',
      }),
    ]
  })

  const isCurrentHref = (path = '/') => localePath(path) === route.path

  return {
    snbMenus,
    appBarMenus,
    isCurrentHref,
  }
})
