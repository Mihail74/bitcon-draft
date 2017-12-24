const keystone = require('keystone')
const randomString = requireRoot('lib/utils/generators/RandomString')

const TokenModel = keystone.list('Token').model

class TokenService {
  async issueToken (resourceID) {
    const token = new TokenModel({resourceID, rawToken: randomString()})
    return token.save()
  }
}

module.exports = new TokenService()
