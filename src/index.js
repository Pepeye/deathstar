// extract app configs
import config from './config'
import app from './server'

app.listen(config.server.port, config.server.host, () => {
  // debug('Starting server')
  console.log(`Server Started
    =============================
    host : ${config.server.host}
    Port : ${config.server.port}
    -----------------------------
 `)
})
