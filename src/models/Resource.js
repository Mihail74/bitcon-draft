const mongoose = require('mongoose')

const Resource = new mongoose.Schema({
  path: String,
  price: Number, // in satoshi
  content: String
})

module.exports = mongoose.model('Resource', Resource)
