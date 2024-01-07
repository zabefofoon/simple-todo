import { defineStore } from 'pinia'
import { Menu } from '~/models/Menu'

export const useMenuStore = defineStore('menu', () => {
  const menus = ref()

  onBeforeMount(() => {
    menus.value = [
      Menu.of({ code: 'todo', name: 'Todo', href: '/todo', icon: 'icon-file' }),
      Menu.of({
        code: 'calender',
        name: 'Calender',
        href: '/calender',
        icon: 'icon-calender',
      }),
      Menu.of({
        code: 'analysis',
        name: 'Analysis',
        href: '/analysis',
        icon: 'icon-analysis',
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
        href: '/',
        icon: 'icon-help',
        external: true,
      }),
    ]
  })

  return {
    menus,
  }
})