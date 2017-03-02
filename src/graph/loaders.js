import { Loader as users } from './user'

const rootLoaders = {
  ...users
}

export default function loaders () {
  return rootLoaders
}
