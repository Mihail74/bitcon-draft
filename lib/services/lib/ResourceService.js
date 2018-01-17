const keystone = require('keystone')

const ResourceModel = keystone.list('Resource').model
// const TokenModel = keystone.list('Token').model

class ResourceService {
  async getResourceByToken (rawToken) {
    // const token = await TokenModel.findOne({rawToken})
    //
    // if (token === null) {
    //   throw new Error('Token not found')
    // }
    //
    // return ResourceModel.findOne({_id: token.resourceID})
  }
}

module.exports = new ResourceService()
