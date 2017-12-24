const keystone = require('keystone')

const Resource = new keystone.List('Resource', {
  sortable: true
})

Resource.add({
  path: { type: String, required: true, initial: true },
  price: { type: Number, required: true, initial: true }, // in satoshi
  content: { type: String, required: true, initial: true }
})

Resource.defaultColumns = 'path, price, price'
Resource.register()
