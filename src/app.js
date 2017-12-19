const config = require('config')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')

const { serivicesInitializer, blocksObserver } = requireRoot('src/services')
const routes = requireRoot('src/routers')

function createApp (options) {
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost/bitcoin-draft', { useMongoClient: true })
    .then(async () => {
      await serivicesInitializer()
      await blocksObserver.start()
      startServer()
    })
    .catch(err => {
      console.error('App starting error:', err.stack)
      throw err
    })
}

function startServer () {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  routes(app)

  const port = config.get('port')
  app.listen(port, () => console.log(`app: Example app listening on port ${port}!`))
}

module.exports = {
  createApp
}
