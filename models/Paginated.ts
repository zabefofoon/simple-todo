export class Paginated<T> {
  public readonly page: number
  public readonly total: number
  public readonly data: T[]

  constructor(paginated: Paginated<T>) {
    this.page = paginated.page
    this.total = paginated.total
    this.data = paginated.data
  }

  static of<T>(paginated: Paginated<T>) {
    return new Paginated(paginated)
  }
}
