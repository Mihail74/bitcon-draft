async function initializeServices () {
  const childAddressProvider = requireRoot('lib/services/ChildAddressProvider')

  console.log('servicesInitializer: initializeServices start')
  await childAddressProvider.initialize()
  console.log('servicesInitializer: initializeServices finished')
}

module.exports = initializeServices
