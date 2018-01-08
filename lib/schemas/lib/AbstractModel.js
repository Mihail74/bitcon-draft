const Joi = require('joi')
const { WebError } = requireRoot('lib/errors')
module.exports = class AbstractModel {
  constructor (data, schema) {
    try {
      const { error, value } = Joi.validate(data, schema)
      if (error) {
        throw new WebError(`[${this.constructor.name}].${error}`, 400)
      }
      Object.assign(this, value)
    } catch (e) {
      console.error(e.message)
      throw e
    }
  }
}
