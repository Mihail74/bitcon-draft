const Joi = require('joi')
const AbstractModel = require('./AbstractModel')

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
}

module.exports = class RegisterUserModel extends AbstractModel {
  constructor (data) {
    super(data, schema)
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new RegisterUserModel({
      ...data
    })
  }
}
