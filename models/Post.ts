import type { ClassToRaw } from '~/utils/type.util'

export class Post {
  id: number
  public: boolean
  title: string
  description: string
  image: string | null
  start: string | null
  end: string | null
  pageData?: string | null
  created_at: number | null

  constructor(post: ClassToRaw<Post>) {
    this.id = post.id
    this.public = post.public
    this.title = post.title
    this.description = post.description
    this.image = post.image
    this.start = post.start
    this.end = post.end
    this.pageData = post.pageData
    this.created_at = post.created_at
  }

  static of(post: ClassToRaw<Post>) {
    return new Post(post)
  }

  static empty() {
    return {
      public: false,
      title: '',
      description: '',
      image: '',
    }
  }
}

export class PostBrief {
  id: number
  public: boolean
  title: string | null
  description: string
  image: string | null
  created_at: number | null
  path: string

  constructor(post: ClassToRaw<PostBrief>) {
    this.id = post.id
    this.public = post.public
    this.title = post.title
    this.description = post.description
    this.image = post.image
    this.created_at = post.created_at
    this.path = post.path
  }

  get isEmpty() {
    return this.id === -1
  }

  static of(post: ClassToRaw<PostBrief>) {
    return new PostBrief(post)
  }

  static empty() {
    return new PostBrief({
      id: -1,
      public: true,
    })
  }
}
