import type { Url } from 'url'

interface MenuBase {
  name: string
  link: Url | string
}

interface Dropdownbase extends MenuBase {
  action: string
}

export type HeaderContent = MenuBase[]

export type CollapseContent = MenuBase[]

export type DropDownMenu = Dropdownbase[]
