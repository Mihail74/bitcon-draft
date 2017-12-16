const mongoose = require('mongoose')
const tokenModel = requireRoot('src/models/Token')
const resourceModel = requireRoot('src/models/Resource')

async function getResourceByToken(rawToken){
  const token = await tokenModel.findOne({rawToken})
  if(token == null) {
    return Promise.reject('Token not found')
  }

  const resource = await resourceModel.findOne({_id: token.resourceID})

  return resource
}

module.exports = {
  getResourceByToken
}
