import mongoose from '../../lib/mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const SALT = 10

const Schema = new mongoose.Schema({
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
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
Schema.pre('save', function (next) {
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

Schema.methods.comparePassword = function (suppliedPassword, cb) {
  bcrypt.compare(suppliedPassword, this.password, (err, result) => {
    if (err) return cb(err)
    return (cb, result)
  })
}

Schema.methods.toJSON = function () {
  let user = this
  let { _id, firstName, lastName, email, active, roles } = user.toObject()
  return { _id, firstName, lastName, email, active, roles }
}

Schema.methods.generateAuthToken = function () {
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

Schema.statics.findByToken = function (token) {
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

Schema.statics.findByCredentials = function (email, password) {
  let User = this

  return User.findOne({ email })
    .then(user => {
      if (!user) {
        return Promise.reject(new Error('Invalid login'))
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

export default mongoose.model('User', Schema)
