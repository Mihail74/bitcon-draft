const keystone = require('keystone')
const io = require('socket.io-client')
const axios = require('axios')
const config = require('config')
const RequestStatus = requireRoot('lib/enums/RequestStatus')
const accessResourceTokenService = require('./AccessResourceTokenService')

const RequestModel = keystone.list('Request').model
const ResourceModel = keystone.list('Resource').model

class BlockObserver {
  constructor () {
    this.axios = axios.create({
      baseURL: config.get('blockexplorer')
    })
  }

  start () {
    this.handlePaidRequests()

    const eventToListenTo = 'block'
    const room = 'inv'

    const self = this

    const socket = io(config.get('blockexplorer'))
    socket.on('connect', function () {
      console.log(`BlockObserver: subscribed for new block from ${config.get('blockexplorer')}`)
      // Join the room.
      socket.emit('subscribe', room)
    })

    socket.on(eventToListenTo, function (blockId) {
      console.log('BlockObserver: received new block')
      self.handlePaidRequests()
    })
  }

  async handlePaidRequests () {
    const waitPaidRequestList = await RequestModel.find({status: RequestStatus.WAIT_PAID})
      .populate('address')
      .populate('user')
      .populate('resource')
      .exec()
    waitPaidRequestList.forEach(async request => {
      const { data: balance } = await this.axios.get(`/api/addr/${request.address.address}/balance`)
      const resource = await ResourceModel.findOne({_id: request.resource})
      if (resource.price < balance) {
        await accessResourceTokenService.makeAccess(request)
        await RequestModel.update({ _id: request.id }, { status: RequestStatus.PAID })
      }
    })
  }
}

module.exports = new BlockObserver()
