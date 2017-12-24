const keystone = require('keystone')
const Types = keystone.Field.Types

const User = new keystone.List('User')

User.add(
  {
    name: { type: Types.Name, required: true, index: true },
    email: { type: Types.Email, required: true, initial: true, unique: true, index: true },
    password: { type: Types.Password, required: true, initial: true }
  },
  'Permissions',
  {
    isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
  })

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin
})

User.defaultColumns = 'name, email, isAdmin'
User.register()
