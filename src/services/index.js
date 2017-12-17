const childAddressProvider = require('./addresses/ChildAddressProvider')
const blocksObserver = require('./blocks')
const serivicesInitializer = require('./initializer')

module.exports = {
  serivicesInitializer,
  childAddressProvider,
  blocksObserver
}
