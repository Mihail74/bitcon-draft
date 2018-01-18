const keystone = require('keystone')

const Types = keystone.Field.Types

const AccessResourceToken = new keystone.List('AccessResourceToken', {
  sortable: true
})

AccessResourceToken.add({
  resource: { type: Types.Relationship, ref: 'Resource', required: true, initial: true },
  user: { type: Types.Relationship, ref: 'User', required: true, initial: true },
  creationDate: { type: Date, default: Date.now, required: true, initial: true }
})

AccessResourceToken.defaultColumns = 'resourceID, rawToken, creationDate'
AccessResourceToken.register()
