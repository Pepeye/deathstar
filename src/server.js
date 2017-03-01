// extract app configs
import config from './config'

// import core server libraries
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'
import morgan from 'morgan'


const routes = require('./routes')

const app = express()

process.env.SECRET = 'somesupersecretpasswordthatishardtoguess'

/**
 * Configure middleware
 */
app.use(helmet())
app.use(cors())
// app.use(csrf())
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
  res.json({ message: 'Welcome Stormtrooper!' })
})

app.use('/', routes)

module.exports = app
