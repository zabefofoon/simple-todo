export class Menu {
  code?: string
  name?: string
  href?: string
  external?: boolean
  icon?: string

  constructor(menu: Partial<Menu>) {
    Object.assign(this, menu)
  }

  static of(menu: Partial<Menu>) {
    return new Menu(menu)
  }
}
