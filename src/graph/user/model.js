import DataLoader from 'dataloader'
import Schema from './schema'

const loadFn = async (keys) => {
  return keys.map(key => Schema.findOne({ _id: key }))
}

export default class User {
  static items = new DataLoader(loadFn)

  constructor (data, viewer) {
    this.id = data.id
    this._id = data._id
    this.firstname = data.firstname
    this.lastname = data.lastname

    // you can only see your own email, and your active status
    if (viewer && data._id.equals(viewer._id)) {
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

  static async many (viewer, ids) {
    let users = await User.items.loadMany(ids)
    return new Promise((resolve, reject) => {
      if (users) {
        let result = users.map(data => User.viewerCanSee(viewer, data) ? new User(data, viewer) : null)
        resolve(result)
      } else {
        reject(new Error('no data found'))
      }
    })
  }
}
