const keystone = require('keystone')
const AccessResourceTokenModel = keystone.list('AccessResourceToken').model

class AccessResourceTokenService {
  async makeAccess (request) {
    return new AccessResourceTokenModel({
      resource: request.resource._id,
      user: request.user._id
    }).save()
  }
}

module.exports = new AccessResourceTokenService()
