const APP_NAME = 'deathstar'
const ENV = process.env.NODE_ENV || 'dev'
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

const config = {
  name: APP_NAME,
  environment: ENV,
  server: {
    port: PORT,
    host: HOST
  },
  mongo: {
    url: `mongodb://localhost:27017/${APP_NAME}-${ENV}`
  }
}

module.exports = config
