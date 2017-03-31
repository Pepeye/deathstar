import { User } from '../graph/user'

const authenticate = (req, res, next) => {
  let token = getAuthToken(req.headers.authorization)
  return User.findByToken(token)
    .then((user) => {
      if (!user) {
        return res.status(404).end()
      }
      // if (!user) { return Promise.reject() }

      req.user = { _id: user._id, token }
      req.token = token
      next()
    })
    .catch(err => res.status(401).send(err))
}

export const getUser = async (token) => {
  if (!token) return { user: null }
  let user = await User.findByToken(token)
  return { _id: user.id, token }
}

export const getAuthToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null
}

export default { authenticate, getUser, getAuthToken }
