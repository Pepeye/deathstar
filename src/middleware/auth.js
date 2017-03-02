
// const authenticate = (req, res, next) => {
//   let token = req.header('X-Auth-Token')
//   return User.findByToken(token)
//     .then((user) => {
//       if (!user) { return res.status(404).end() }
//       // if (!user) { return Promise.reject() }
//
//       req.user = user
//       req.token = token
//       next()
//     })
//     .catch(err => res.status(401).send(err))
// }
//
// export default authenticate
