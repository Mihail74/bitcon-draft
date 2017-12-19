const mongoose = require('mongoose')

const Address = new mongoose.Schema({
  isMaster: Boolean,
  base58: String,
  index: Number,
  address: String,
  nodeNumber: Number,
  coinType: Number
})

module.exports = mongoose.model('Address', Address)
