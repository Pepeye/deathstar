// extract app configs
import config from './config'

// import core server libraries
import express from 'express'
import graphqlHTTP from 'express-graphql'
import jwt from 'express-jwt'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { printSchema } from 'graphql/utilities'
import { formatError, getUser } from './middleware'

// import graph files
import loaders from './graph/loaders'
import schema from './graph/schema'

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

let authenticate = jwt({
  secret: process.env.SECRET,
  credentialsRequired: false,
  userProperty: 'user'
})

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

/**
* GraphQL routes
*/

app.use('/graphql', authenticate, graphqlHTTP(async (req) => {
  const { user } = await getUser(req.headers.authorization)
  let startTime = Date.now()
  return {
    schema,
    // graphiql: process.env.NODE_ENV !== 'production',
    graphiql: true,
    context: {
      user,
      loaders: loaders()
    },
    extensions ({ document, variables, operationName, result }) {
      return {
        runtime: Date.now() - startTime,
        ip: req.ip
      }
    },
    formatError
  }
}))

app.use('/schema', (req, res, next) => {
  res.set('Content-Type', 'text/plain')
  res.send(printSchema(schema))
})

// app.use('/', routes)

module.exports = app
