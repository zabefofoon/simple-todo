import ShortUniqueId from 'short-unique-id'

export const generateUniqueId = (): string => {
  const uId = new ShortUniqueId({
    length: 10,
    //HTML의 element에 id를 부여할 때, 맨 처음 숫자가 숫자면 에러
    dictionary: 'alpha',
  })
  return uId.rnd()
}
