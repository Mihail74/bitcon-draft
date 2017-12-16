const mongoose = require('mongoose')

const Resource = new mongoose.Schema({
  path: String,
  price: Number //in satoshi
})

module.exports = mongoose.model('Resource', Resource)
