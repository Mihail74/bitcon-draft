const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const mongoose = require('mongoose')
const { serivicesInitializer, blocksObserver } = requireRoot('src/services')
const routes = requireRoot('src/routers')

async function createApp (options) {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/bitcoin-draft', { useMongoClient: true })
    .then(async () => {
        await serivicesInitializer()
        await blocksObserver.start()
        startServer()
    })
    .catch(err => {
        console.error('App starting error:', err.stack)
        process.exit(1)
    });
}

function startServer() {
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
