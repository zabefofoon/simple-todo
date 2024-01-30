import { generateUniqueId } from '../utils/etc'

export class Tag {
  id?: string = generateUniqueId()
  color = ''
  label = ''

  constructor(tag: Partial<Tag>) {
    Object.assign(this, tag)
  }

  static of(tag: Partial<Tag>) {
    return new Tag(tag)
  }
}
