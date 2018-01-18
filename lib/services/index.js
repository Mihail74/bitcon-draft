const blockObserver = require('./lib/BlockObserver')
const childAddressProvider = require('./lib/ChildAddressProvider')
const resourceService = require('./lib/ResourceService')
const accessResourceTokenService = require('./lib/AccessResourceTokenService')
const authService = require('./lib/auth/AuthService')

module.exports = {
  blockObserver,
  childAddressProvider,
  resourceService,
  accessResourceTokenService,
  authService
}
