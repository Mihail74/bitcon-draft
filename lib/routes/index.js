const keystone = require('keystone')

const middlewareRouter = require('./lib/middleware')
const resourceRouter = require('./lib/resources')

keystone.pre('routes', middlewareRouter.initLocals)

module.exports = function (app) {
  app.all('/api/*', keystone.middleware.cors)

  app.options('/api/*', (req, res) => {
    res.send(200)
  })

  app.get('/', (req, res) => {
    res.redirect('/keystone/')
  })

  app.use('/api/resources', resourceRouter)

  app.use(function (err, req, res, next) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    res.status(err.statusCode).send({
      details: err.message
    })
  })

  app.use(function (req, res, next) {
    res.status(404).send({
      details: 'URL not supported'
    })
  })
}
