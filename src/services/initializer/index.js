const childAddressProvider = requireRoot('src/services/addresses/ChildAddressProvider')

async function initializeServices () {
  console.log('initializer: initializeServices start')
  await childAddressProvider.initialize()
  console.log('initializer: initializeServices finished')
}

module.exports = initializeServices
