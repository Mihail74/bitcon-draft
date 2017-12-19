const express = require('express')
const mongoose = require('mongoose')
const ResourceModel = requireRoot('src/models/Resource')
const RequestModel = requireRoot('src/models/Request')
const { childAddressProvider, resourceService } = requireRoot('src/services')
const router = express.Router()

router.post('/buy', async function (req, res, next) {
  const resource = await ResourceModel.findOne({path: req.body.path})

  if (resource === null) {
    let error = new Error(`Resource with path = ${req.body.path} not found`)
    error.statusCode = 404
    next(error)
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

router.post('/get', async function (req, res, next) {
  const rawToken = req.body.token
  const resourcePath = req.body.path

  try {
    const resource = await resourceService.getResourceByToken(rawToken)

    if (resource.path !== resourcePath) {
      let error = new Error(`Resource with path = ${req.body.path} not found`)
      error.statusCode = 404
      next(error)
      return
    }

    res.send(resource.content)
  } catch (error) {
    error.statusCode = 404
    next(error)
  }
})

module.exports = router
