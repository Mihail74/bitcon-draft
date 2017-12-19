const TokenModel = requireRoot('src/models/Token')
const resourceModel = requireRoot('src/models/Resource')

class ResourceService {
  async getResourceByToken (rawToken) {
    const token = await TokenModel.findOne({rawToken})

    if (token === null) {
      throw new Error('Token not found')
    }

    return resourceModel.findOne({_id: token.resourceID})
  }
}

module.exports = new ResourceService()
