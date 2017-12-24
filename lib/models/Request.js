const keystone = require('keystone')
const RequestStatus = requireRoot('lib/enums/RequestStatus')

const Types = keystone.Field.Types

const Request = new keystone.List('Request', {
  sortable: true
})

Request.add({
  resourceID: { type: Types.Relationship, ref: 'Resource', required: true, initial: true },
  address: { type: String, required: true, initial: true },
  status: { type: String, default: RequestStatus.WAIT_PAID, required: true, initial: true },
  creationDate: { type: Date, default: Date.now, required: true, initial: true }
})

Request.defaultColumns = 'resourceID, address, status, creationDate'
Request.register()
