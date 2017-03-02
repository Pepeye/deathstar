import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const SALT = 10

const User = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, index: { unique: true } },
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
  roles: [String],
  tokens: [{
    access: { type: String, required: true },
    token: { type: String, required: true }
  }]
})

/**
 * Pre-save hooks
 */
User.pre('save', function (next) {
  let user = this
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(SALT, (err, salt) => {
    if (err) return next(err)

    // hash the password
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

/**
 * Methods
 */

User.methods.comparePassword = function (suppliedPassword, cb) {
  bcrypt.compare(suppliedPassword, this.password, (err, result) => {
    if (err) return cb(err)
    return (cb, result)
  })
}

User.methods.toJSON = function () {
  let user = this
  let { _id, firstName, lastName, email, active, roles } = user.toObject()
  return { _id, firstName, lastName, email, active, roles }
}

User.methods.generateAuthToken = function () {
  let user = this
  let access = 'local'
  let params = { _id: user._id.toHexString(), access }
  let token = jwt.sign(params, process.env.SECRET).toString()

  user.tokens.push({ access, token })
  // return promise
  return user.save().then(() => {
    // return token value
    return token
  })
}

/**
 * Statics
 */

User.statics.findByToken = function (token) {
  let User = this
  let decoded

  try {
    decoded = jwt.verify(token, process.env.SECRET)
  } catch (err) {
    return Promise.reject(err)
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'local'
  })
}

User.statics.findByCredentials = function (email, password) {
  let User = this

  return User.findOne({ email })
    .then(user => {
      if (!user) {
        return Promise.reject()
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            resolve(user)
          } else {
            reject(err)
          }
        })
      })
    })
}

export default mongoose.model('User', User)
