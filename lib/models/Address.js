const keystone = require('keystone')

const Address = new keystone.List('Address', {
  sortable: true
})

Address.add({
  index: { type: Number, required: true, initial: true },
  address: { type: String, required: true, initial: true },
  nodeNumber: { type: Number, required: true, initial: true },
  coinType: { type: Number, required: true, initial: true }
})

Address.defaultColumns = 'index, address, nodeNumber, coinType'
Address.register()
