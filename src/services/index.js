const childAddressProvider = require('./addresses/ChildAddressProvider')
const blocksObserver = require('./blocks')
const resourceService = require('./resources')
const tokenService = require('./tokens')
const serivicesInitializer = require('./initializer')

module.exports = {
  serivicesInitializer,
  childAddressProvider,
  blocksObserver,
  resourceService,
  tokenService
}
