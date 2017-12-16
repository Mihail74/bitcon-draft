const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const mongoose = require('mongoose')
const serivicesInitializer = requireRoot('src/services/initializer')

async function createApp (options) {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/bitcoin-draft', { useMongoClient: true })
    .then(async () => {
        await serivicesInitializer()
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

  // app.use('/api/address', addressesRouting)

  const port = config.get('port')
  app.listen(port, () => console.log(`app: Example app listening on port ${port}!`))
}

module.exports = {
  createApp
}
