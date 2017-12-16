const mongoose = require('mongoose')

const Token = new mongoose.Schema({
  resourceID: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' },
  creationDate: { type: Date, default: Date.now },
  rawToken: String
})

module.exports = mongoose.model('Token', Token)
