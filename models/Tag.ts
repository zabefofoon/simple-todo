import { generateUniqueId } from '../utils/etc'

export class Tag {
  id = generateUniqueId()
  color = ''
  label = ''

  constructor(tag: Partial<Tag>) {
    Object.assign(this, tag)
  }

  static of(tag: Partial<Tag>) {
    return new Tag(tag)
  }
}
