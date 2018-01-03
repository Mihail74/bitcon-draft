const express = require('express')
const { WebError } = requireRoot('lib/errors')
const { securityService } = requireRoot('lib/services')
const { authenticate } = require('./middleware')

const router = express.Router()

router.post('/register', async function (req, res, next) {
  const { email, password, firstName, lastName } = req.body
  securityService.register({ email, password, firstName, lastName })
    .then(e => {
      res.send({ details: 'success' })
    })
    .catch(error => res.send(error))
})

router.post('/login', async function (req, res, next) {
  const { email, password } = req.body
  try {
    const token = await securityService.login({ email, password })
    res.send({
      token: token.token,
      user: {
        _id: token.user._id,
        email: token.user.email
      }
    })
  } catch (e) {
    if (e instanceof WebError) {
      console.log(e)
      res.status(e.status).send(e.message)
    } else {
      console.log(e)
      res.status(500).send(e.message)
    }
  }
})

router.post('/logout', authenticate(), async (req, res, next) => {
  const { authorization } = req.headers
  try {
    await securityService.logout({
      token: authorization
    })

    res.send({
      ok: true
    })
  } catch (e) {
    if (e instanceof WebError) {
      res.status(e.status).send(e.message)
    } else {
      console.log(e)
      res.status(500).send(e.message)
    }
  }
})

module.exports = router
