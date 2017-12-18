const mongoose = require('mongoose')
const TokenModel = requireRoot('src/models/Token')
const randomString = requireRoot('src/utils/generators/RandomString')

class TokenService {
  async issueToken (resourceID) {
    const token = new TokenModel({resourceID: mongoose.Types.ObjectId(resourceID), rawToken: randomString()})
    return token.save()
  }
}

module.exports = new TokenService()
