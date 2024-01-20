import { Tag } from './Tag'

export type Theme = 'white' | 'dark'
export type Language = 'en' | 'ko'
export type Display = 'thumbnail' | 'row'

export class Setting {
  id?: number
  theme: Theme = 'white'
  language: Language = 'en'
  display: Display = 'thumbnail'
  tags: Tag[] = []
  forms: Form[] = []

  constructor(setting?: Partial<Setting>) {
    this.id = setting?.id
    this.theme = setting?.theme || 'white'
    this.language = setting?.language || 'en'
    this.display = setting?.display || 'thumbnail'
    this.tags = setting?.tags || [
      Tag.of({ label: 'Work', color: '#4834d4' }),
      Tag.of({ label: 'Promise', color: '#eb4d4b' }),
    ]
    this.forms = setting?.forms || [
      Form.of({ title: 'Basic', description: '' }),
    ]
  }

  static of(setting?: Partial<Setting>) {
    return new Setting(setting)
  }
}

export class Form {
  id = generateUniqueId()
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
