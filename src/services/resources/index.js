const TokenModel = requireRoot('src/models/Token')
const resourceModel = requireRoot('src/models/Resource')

async function getResourceByToken (rawToken) {
  const token = await TokenModel.findOne({rawToken})
  if (token == null) {
    // TODO: throw error
    return Promise.reject(new Error('Token not found'))
  }

  resourceModel.findOne({_id: token.resourceID})
}

module.exports = {
  getResourceByToken
}
