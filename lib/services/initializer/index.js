async function initializeServices () {
  const childAddressProvider = requireRoot('lib/services/lib/ChildAddressProvider')

  console.log('servicesInitializer: initializeServices start')
  await childAddressProvider.initialize()
  console.log('servicesInitializer: initializeServices finished')
}

module.exports = initializeServices
