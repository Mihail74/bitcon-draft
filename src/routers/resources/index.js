const express = require('express')
const mongoose = require('mongoose')
const ResourceModel = requireRoot('src/models/Resource')
const RequestModel = requireRoot('src/models/Request')
const { childAddressProvider, resourceService } = requireRoot('src/services')
const router = express.Router()

router.post('/buy', async function (req, res) {
  const resource = await ResourceModel.findOne({path: req.body.path})

  if (resource === null) {
    // TODO: error handling in express
    res.status(404).send('Resource with specified path not found')
    return
  }

  const address = await childAddressProvider.nextChildAddress()

  const request = new RequestModel({resourceID: mongoose.Types.ObjectId(resource._id), address})
  await request.save()

  res.send({
    address: request.address,
    price: resource.price
  })
})

router.post('/get', async function (req, res) {
  const rawToken = req.body.token
  const resourcePath = req.body.path

  try {
    const resource = await resourceService.getResourceByToken(rawToken)

    if (resource.path !== resourcePath) {
      res.status(404).send('Token not from the requested resource')
      return
    }

    res.send(resource.content)
  } catch (e) {
    res.status(404).send('Token incorrect')
  }
})

module.exports = router
