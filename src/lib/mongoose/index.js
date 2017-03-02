import config from '../../config'
import mongoose from 'mongoose'

// Use native promises
mongoose.Promise = global.Promise
mongoose.connect(config.mongo.url)

module.exports = mongoose
