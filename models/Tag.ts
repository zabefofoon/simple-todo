export class Tag {
  color = ''
  label = ''

  constructor(tag: Partial<Tag>) {
    Object.assign(this, tag)
  }

  static of(tag: Partial<Tag>) {
    return new Tag(tag)
  }
}
