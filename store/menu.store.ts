import { defineStore } from 'pinia'
import { Menu } from '~/models/Menu'

export const useMenuStore = defineStore('menu', () => {
  const menus = ref()

  menus.value = [
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
      external: false,
    }),
  ]
  return {
    menus,
  }
})
