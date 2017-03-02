import DataLoader from 'dataloader'
import Model from './model'

export default {
  users: new DataLoader(ids => User.load(ids))
}

// export default {
//   users: new DataLoader(ids => genUsers(authToken, ids))
// }

// export default class User {
//   static loader = new DataLoader(
//     ids => ids.map(
//       id => Model.findOne({ _id: id })
//     )
//   )
//
//   constructor (data) {
//     this.id = data.id
//     this._id = data._id
//   }
//
//   static async load (id) {
//     if (!id) return null
//     return await User.loader.load(id)
//   }
//
//   static async loadMany (ids) {
//     if (!ids) return null
//   }
// }
