const mongoose = require('mongoose')

const Address = new mongoose.Schema({
  isMaster: Boolean,
  base58: String,
  index: Number,
  address: String
})

module.exports = mongoose.model('Address', Address)
