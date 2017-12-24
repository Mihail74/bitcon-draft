const path = require('path')
const keystone = require('keystone')
const config = require('config')

function createApp (options) {
  keystone.init({
    'name': 'bitcoin-experiment',
    'brand': 'bitcoin-experiment',

    'auto update': true,
    'user model': 'User',
    'mongo': config.get('storage.url'),

    'port': config.get('port'),

    'module root': path.join(__dirname, '../'),

    'session': true,
    'auth': true,
    'cookie secret': config.get('keystone.cookieSecret'),

    ...options
  })

  keystone.import('lib/models')

  keystone.set('cors allow origin', true)

  keystone.set('routes', require('./routes'))

  // keystone.set('nav', {
  //   users: ['users']
  // })

  keystone.stop = function () {
    keystone.httpServer.close()
    keystone.mongoose.connection.close()
  }

  return keystone
}

module.exports = {
  createApp
}
