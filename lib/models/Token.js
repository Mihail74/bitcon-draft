const keystone = require('keystone')

const Types = keystone.Field.Types

const Token = new keystone.List('Token', {
  sortable: true
})

Token.add({
  resourceID: { type: Types.Relationship, ref: 'Resource', required: true, initial: true },
  rawToken: { type: String, required: true, initial: true },
  creationDate: { type: Date, default: Date.now, required: true, initial: true }
})

Token.defaultColumns = 'resourceID, rawToken, creationDate'
Token.register()
