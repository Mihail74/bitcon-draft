const mongoose = require('mongoose')
const tokenModel = requireRoot('src/models/Token')
const randomString = requireRoot('src/utils/generators/RandomString')

async function issueToken(resourceID) {
  const token = new tokenModel({resourceID: mongoose.Types.ObjectId(resourceID), rawToken: randomString()})
  return await token.save()
}

module.exports = {
  issueToken
}
