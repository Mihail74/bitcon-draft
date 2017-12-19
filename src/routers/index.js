const resourceRouter = require('./resources')

function routes (app) {
  app.use('/api/resource', resourceRouter)

  app.use(function (err, req, res, next) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    res.status(err.statusCode).send(err.message)
  })

  app.use(function (req, res, next) {
    res.status(404).send('URL not supported')
  })
}

module.exports = routes
