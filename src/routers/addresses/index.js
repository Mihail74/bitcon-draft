const express = require('express')
const router = express.Router()

router.get('/next', function (req, res) {
  res.send('work')
})

module.exports = router
