export interface Item {
  id?: string
  html: string
  css: string
  name: string
  description: string
  instance: string
}

export interface Group {
  name: string
  items: Item[]
}

export interface Marker {
  text: string
  date: Date
}

export interface Node {
  id: string
  nodes: Node[]
  selectedResponsiveMode: ResponsiveMode
  layout: ResponsiveNodeLayout
  widget?: Item
  parentId?: string
}

export type ResponsiveMode = 'small' | 'large'

export interface ResponsiveNodeLayout {
  small: NodeLayout
  large: NodeLayout
}

export interface NodeLayout {
  type?: NodeLayoutType
  direction?: NodeDirection
  columns?: number
  gap?: string
  width?: string
  height?: string
  maxWidth?: string
  mainAxis?: MainAxis
  crossAxis?: CrossAxis
  hidden: boolean
  paddingLeft?: string
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  position?: Position
  top?: string
  left?: string
  right?: string
  bottom?: string
  transparent?: boolean
  zIndex?: number
}

export type NodeLayoutType = 'stack' | 'grid'

export type NodeDirection = 'horizontal' | 'vertical'

export type MainAxis = 'start' | 'center' | 'end' | 'between'

export type CrossAxis = 'start' | 'center' | 'end'

export type Position = 'relative' | 'absolute' | 'sticky' | 'fixed'

export type Direction = 'left' | 'top' | 'right' | 'bottom'
