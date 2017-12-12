const express = require('express')
const childWalletProvider = require('../../services/addresses/ChildWalletProvider.js')
const router = express.Router()

router.get('/next', function (req, res) {
  res.send('work')
})

module.exports = router
