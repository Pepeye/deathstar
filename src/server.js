// extract app configs
import config from './config'

// import core server libraries
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'
import morgan from 'morgan'

// const routes = require('./routes')

const app = express()

process.env.SECRET = 'somesupersecretpasswordthatishardtoguess'

/**
 * Configure middleware
 */
app.use(helmet())
app.use(cors())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

if (config.environment !== 'test') {
  app.use(morgan('dev'))
}

/**
 * API routes / endpoints
 */
 /**
  * Define routes
  */
app.get('/', (req, res) => {
  let data = { message: `'Welcome ${config.name}!'` }
  if (config.environment !== 'production') {
    data = {
      ...data,
      environment: config.environment,
      host: config.server.host,
      port: config.server.port,
      date: Date.now()
    }
  }
  res.json(data)
})

// app.use('/', routes)

module.exports = app
