const mongoose = require('mongoose')

var Address = mongoose.model('Address', { address: String, index: Number });

module.exports = {
  Address
}
