import { generateUniqueId } from '~/utils/etc'

export default {
  defaultGoogleTodo: [
    generateUniqueId(),
    '', // upto
    '', // date
    'Welcome!', // description
    '', // tagId
    '', // time
    new Date().getTime(), // created
    '', //done
    new Date().getTime(), // modified
    '', // images
    'google',
  ],
}
