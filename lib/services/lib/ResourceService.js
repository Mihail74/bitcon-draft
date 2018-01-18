const { WebError } = requireRoot('lib/errors')
const keystone = require('keystone')
const ResourceModel = keystone.list('Resource').model
const AccessResourceToken = keystone.list('AccessResourceToken').model

class ResourceService {
  async getResourceByToken ({ path, userID }) {
    const resource = await ResourceModel.findOne({ path })

    if (resource === null) {
      throw new WebError(`Resource with path = ${path} not found`, 404)
    }

    const accessToken = await AccessResourceToken.findOne({ user: userID, resource: resource._id })

    if (accessToken === null) {
      throw new WebError(`No acces to resource with path = ${path} not found`, 403)
    }

    return resource
  }
}

module.exports = new ResourceService()
