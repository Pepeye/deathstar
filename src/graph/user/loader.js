import DataLoader from 'dataloader'
import User from './model'

export default {
  user: new DataLoader(ids => User.load(ids))
}
