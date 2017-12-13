const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')

const addressesRouting = requireRoot('src/routers/addresses')
const models = requireRoot('src/models')

function createApp (options) {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use('/api/address', addressesRouting)

  const port = config.get('port')
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

module.exports = {
  createApp
}
