export interface ServerResponse<T> {
  status: number
  message: string
  result: T
}
