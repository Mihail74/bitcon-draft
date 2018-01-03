const { securityService } = requireRoot('lib/services')
/**
    Initialises the standard view locals.
    Include anything that should be initialised before route controllers are executed.
*/
exports.initLocals = function (req, res, next) {
  var locals = res.locals
  locals.user = req.user
  // Add your own local variables here
  next()
}

exports.authenticate = (params) => {
  return function (req, res, next) {
    securityService.getToken({ token: req.headers.authorization })
      .then(token => {
        if (token == null) {
          res.status(401).send('no authorize')
          return
        }
        req.token = token
        next()
      })
      .catch(e => {
        req.token = null
        res.status(500).send('Internal error')
      })
  }
}
