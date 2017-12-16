const express = require('express')
const mongoose = require('mongoose')
const resourceModel = requireRoot('src/models/Resource')
const requestModel = requireRoot('src/models/Request')
const RequestStatus = requireRoot('src/models/RequestStatus')
const { childAddressProvider } = requireRoot('src/services')
const { getResourceByToken } = requireRoot('src/services/resources')
const router = express.Router()

router.post('/buy', async function (req, res) {
  const resource = await resourceModel.findOne({path: req.body.path})

  if(resource == null) {
    res.status(404).send("Resource with specified path not found")
    return
  }

  const address = await childAddressProvider.nextChildAddress()

  const request = new requestModel({resourceID: mongoose.Types.ObjectId(resource._id), address})
  await request.save()

  res.send(request.address)
})

router.post('/get', async function (req, res) {
  const rawToken = req.body.token
  const resourcePath = req.body.path

  try {
    const resource = await getResourceByToken(rawToken)
    if(resource.path != resourcePath){
      res.status(404).send("Token not from the requested resource")
      return
    }

    res.send(resource.content)
  } catch (e) {
    res.status(404).send("Token incorrect")
    return
  }
})

module.exports = router
