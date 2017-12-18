const mongoose = require('mongoose')
const RequestStatus = require('./RequestStatus')

const Request = new mongoose.Schema({
  resourceID: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' },
  address: String,
  status: { type: String, default: RequestStatus.WAIT_PAID },
  creationDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Request', Request)
