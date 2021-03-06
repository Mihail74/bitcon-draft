const blockObserver = require('./lib/BlockObserver')
const childAddressProvider = require('./lib/ChildAddressProvider')
const resourceService = require('./lib/ResourceService')
const tokenService = require('./lib/TokenService')
const securityService = require('./lib/auth/SecurityService')

module.exports = {
  blockObserver,
  childAddressProvider,
  resourceService,
  tokenService,
  securityService
}
