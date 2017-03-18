// extract app configs
import 'babel-polyfill'
import config from './config'
import app from './server'

app.listen(config.server.port, () => {
  // debug('Starting server')
  console.log(`Server Started
    =============================
    Port : ${config.server.port}
    data : ${config.mongo.url}
    -----------------------------
 `)
})
