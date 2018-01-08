const blockObserver = require('./lib/BlockObserver')
const childAddressProvider = require('./lib/ChildAddressProvider')
const resourceService = require('./lib/ResourceService')
const tokenService = require('./lib/TokenService')
const authService = require('./lib/auth/AuthService')

module.exports = {
  blockObserver,
  childAddressProvider,
  resourceService,
  tokenService,
  authService
}
