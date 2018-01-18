const express = require('express')
const keystone = require('keystone')

const ResourceModel = keystone.list('Resource').model
const RequestModel = keystone.list('Request').model

const { WebError } = requireRoot('lib/errors')
const { childAddressProvider, resourceService } = requireRoot('lib/services')
const { authenticate } = require('./middleware')

const router = express.Router()

router.post('/:path/buy', authenticate(), async function (req, res, next) {
  const resource = await ResourceModel.findOne({path: req.params.path})

  if (resource === null) {
    next(new WebError(`Resource with path = ${req.params.path} not found`, 404))
    return
  }

  const address = await childAddressProvider.nextChildAddress()

  let request = new RequestModel({ resource: resource._id, address: address._id, user: req.token.user._id })
  request = await request.save()

  request = await RequestModel.findOne({ _id: request._id }).populate('address').exec()

  res.send({
    address: request.address.address,
    price: resource.price
  })
})

router.post('/:path/get', authenticate(), async function (req, res, next) {
  const resourcePath = req.params.path
  const userID = req.token.user._id

  try {
    const resource = await resourceService.getResourceByToken({ path: resourcePath, userID })
    res.send(resource.content)
  } catch (e) {
    if (e instanceof WebError) {
      res.status(e.status).send(e.message)
    } else {
      // eslint-disable-next-line
      console.log(e)
      res.status(500).send(e.message)
    }
  }
})

router.get('/', authenticate(), async function (req, res, next) {
  ResourceModel.find({}, function (err, resources) {
    if (err) {
      res.sendStatus(500)
      return
    }
    const resourcePaths = resources.map(e => e.path)

    res.send(resourcePaths)
  })
})

module.exports = router
