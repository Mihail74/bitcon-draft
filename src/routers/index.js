const resourceRouter = require('./resources')

function routes (app) {
  app.use('/api/resource', resourceRouter)
}

module.exports = routes
