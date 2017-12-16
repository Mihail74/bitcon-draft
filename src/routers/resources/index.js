const express = require('express')
const resourceModel = requireRoot('src/models/Resource')

const router = express.Router()

router.post('/buy', async function (req, res) {
  const resource = await resourceModel.findOne({path: req.body.path})

  if(resource == null) {
    res.status(404).send("Resource with specified path not found")
    return
  }

  //TODO: create new addres, add to db with specified status and in other process wait for paid
  res.send(resource)
})

module.exports = router
