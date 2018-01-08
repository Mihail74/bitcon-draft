const express = require('express')
const { WebError } = requireRoot('lib/errors')
const { authService } = requireRoot('lib/services')
const { authenticate } = require('./middleware')
const { RegisterUserModel } = requireRoot('lib/schemas')

const router = express.Router()

router.post('/register', async function (req, res, next) {
  let userDto = null
  try {
    userDto = RegisterUserModel.fromJS(req.body)
  } catch (e) {
    next(e)
    return
  }

  authService.register(userDto)
    .then(user => {
      res.send({ details: 'success' })
    })
    .catch(error => res.status(400).send(error))
})

router.post('/login', async function (req, res, next) {
  const { email, password } = req.body
  try {
    const token = await authService.login({ email, password })
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
    await authService.logout({
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
