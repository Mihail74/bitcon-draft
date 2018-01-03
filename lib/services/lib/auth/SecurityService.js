const { WebError } = requireRoot('lib/errors')
const keystone = require('keystone')
const { promisify } = require('util')

const User = keystone.list('User').model
const SecurityToken = keystone.list('SecurityToken').model

class SecurityService {
  async register ({ email, password, firstName, lastName }) {
    const user = new User({
      email,
      password,
      name: {
        first: firstName,
        last: lastName
      }
    })

    return user.save()
  }

  async login ({ email, password }) {
    const user = await User.findOne({ email })
    if (!user || !await promisify(user._.password.compare)(password)) {
      throw new WebError('Wrong credentials', 401)
    }

    const token = await SecurityToken.create({
      user: user
    })

    return SecurityToken.findOne({
      _id: token._id
    }).populate('user')
      .exec()
  }

  async logout ({ token }) {
    const result = await SecurityToken.findOne({
      token
    }).populate('user')
      .exec()

    if (!result) {
      throw new WebError('Wrong credentials', 401)
    }
    result.remove()
    return result
  }

  async getToken ({ token }) {
    return SecurityToken.findOne({
      token
    }).populate('user')
      .exec()
  }
}

module.exports = new SecurityService()
