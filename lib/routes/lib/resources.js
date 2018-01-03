const express = require('express')
const keystone = require('keystone')

const ResourceModel = keystone.list('Resource').model
const RequestModel = keystone.list('Request').model

const { WebError } = requireRoot('lib/errors')
const { childAddressProvider, resourceService } = requireRoot('lib/services')

const router = express.Router()

router.post('/buy', async function (req, res, next) {
  const resource = await ResourceModel.findOne({path: req.body.path})

  if (resource === null) {
    next(new WebError(`Resource with path = ${req.body.path} not found`, 404))
    return
  }

  const address = await childAddressProvider.nextChildAddress()

  const request = new RequestModel({resourceID: resource._id, address})
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
      next(new WebError(`Resource with path = ${req.body.path} not found`, 404))
      return
    }

    res.send(resource.content)
  } catch (error) {
    error.statusCode = 404
    next(new WebError(error.message, 404))
  }
})

module.exports = router
