import { Tag } from './Tag'

export type Theme = 'white' | 'dark'
export type Language = 'en' | 'ko' | 'ja'
export type Display = 'thumbnail' | 'row'

export class Setting {
  id?: number
  tags: Tag[] = []
  forms: Form[] = []

  constructor(setting?: Partial<Setting>) {
    this.id = setting?.id
    this.tags = setting?.tags || [
      Tag.of({ label: 'Work', color: '#4834d4', excludeUpload: true }),
      Tag.of({ label: 'Promise', color: '#eb4d4b', excludeUpload: true }),
    ]
    this.forms = setting?.forms || [
      Form.of({ title: 'Basic', description: 'Title:\n\nDescription:' }),
    ]
  }

  static of(setting?: Partial<Setting>) {
    return new Setting(setting)
  }
}

export class Form {
  id?: string = generateUniqueId()
  title: string
  description: string

  constructor(form: Partial<Form>) {
    this.title = form.title || ''
    this.description = form.description || ''
  }

  static of(form: Partial<Form>) {
    return new Form(form)
  }
}
