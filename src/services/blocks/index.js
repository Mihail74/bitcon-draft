const io = require('socket.io-client')
const axios = require('axios')
const config = require('config')
const RequestModel = requireRoot('src/models/Request')
const ResourceModel = requireRoot('src/models/Resource')
const RequestStatus = requireRoot('src/models/RequestStatus')
const { issueToken } = requireRoot('src/services/tokens')

class BlockObserver {
  constructor () {
    this.url = config.get('blockexplorer')
  }

  async start () {
    const eventToListenTo = 'block'
    const room = 'inv'

    var self = this

    var socket = io(this.url)
    socket.on('connect', function () {
      console.log(`BlockObserver: subscribed for new block from ${self.url}`)
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

    waitPaidRequestList.forEach(async request => {
      const { balance } = await axios.get(`${this.url}/api/addr/${request.address}/balance`)
      const resource = await ResourceModel.findOne({_id: request.resourceID})
      if (resource.price < balance) {
        await issueToken(resource._id)
        await RequestModel.update({ _id: request.id }, { status: RequestStatus.PAID })
      }
    })
  }
}

module.exports = new BlockObserver()
