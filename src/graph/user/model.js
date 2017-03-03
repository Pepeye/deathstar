import DataLoader from 'dataloader'
import Schema from './schema'

// export default {
//   users: new DataLoader(ids => Model.load(ids))
// }
//
// export default {
//   users: new DataLoader(ids => genModels(authToken, ids))
// }

const loadFn = async (keys) => {
  if (!keys) {
    return await Schema.find()
  } else {
    return Schema.find().where('_id').in(keys)
  }
}

export default class User {
  // items is a new Dataloader
  // static items = new DataLoader(
  //   ids => ids.map(
  //     id => Schema.findOne({ _id: id })
  //   )
  // )

  static items = new DataLoader(loadFn)
  // static items = new DataLoader(ids => Schema.find().where('_id').in(ids))

  constructor (data, viewer) {
    this.id = data.id
    this._id = data._id
    this.firstname = data.firstname
    this.lastname = data.lastname

    // you can only see your own email, and your active status
    if (viewer && viewer._id.equals(data._id)) {
      this.email = data.email
      this.active = data.active
      this.roles = data.roles
      this.tokens = data.tokens
    }
  }

  static viewerCanSee (viewer, data) {
    // Anyone can see another user
    return true
  }

  static async load (viewer, id) {
    if (!id) return null
    let data = await User.items.load(id)
    if (!data) return null
    return User.viewerCanSee(viewer, data) ? new User(data, viewer) : null
  }

  static async all (viewer) {
    let users = await User.items.load()
    if (!users) return null
    return users.map(user => User.viewerCanSee(viewer, user) ? new User(user, viewer) : null)
    // return await Schema
    //                     .find()
    //                     .then(users => users.map(user => User.load(viewer, user.id)))
    // return await User.load(Schema.find().select('_id'))
    // console.dir(JSON.stringify(ids, null, 2))
    // return ids.map(id => new User(User.items.load(ids)))
  }
  // static async many (viewer) {
  //   let data = await connectionFromMongooseQuery(User.find({}), ...args)
  // }

  // static async many (viewer, args) {
  //   const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {}
  //   const users = Model.find(where, {})
  //
  //   return ConnectionFromMongoCursor.connectionFromMongoCursor(viewer, users, args, Model.load)
  // }
}
