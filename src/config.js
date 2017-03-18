const APP_NAME = 'deathstar'
const ENV = process.env.NODE_ENV || 'dev'
const PORT = process.env.PORT || 3030
// const HOST = process.env.HOST || 'localhost'
const MONGOURI = process.env.MONGOURI || `mongodb://localhost:27017/${APP_NAME}-${ENV}`

const config = {
  name: APP_NAME,
  environment: ENV,
  server: {
    port: PORT
    // host: HOST
  },
  mongo: {
    url: MONGOURI
  }
}

module.exports = config
