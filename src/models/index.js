var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bitcoin-draft', { useMongoClient: true });
mongoose.Promise = global.Promise;

var Address = mongoose.model('Address', { address: String, index: Number });

module.exports = {
  Address
}
