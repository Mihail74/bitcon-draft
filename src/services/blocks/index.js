const io = require('socket.io-client')
const axios = require('axios')
const config = require('config')
const requestModel = requireRoot('src/models/Request')
const resourceModel = requireRoot('src/models/Resource')
const RequestStatus = requireRoot('src/models/RequestStatus')
const { issueToken } = requireRoot('src/services/tokens')

class BlockObserver {
  constructor() {
    this.url = config.get('blockexplorer')
  }

  async start() {
    const eventToListenTo = 'block'
    const room = 'inv'

    var self = this

    var socket = io(this.url);
    socket.on('connect', function() {
      console.log(`BlockObserver: subscribed for new block from ${self.url}`);
      // Join the room.
      socket.emit('subscribe', room);
    })

    socket.on(eventToListenTo, function(blockId) {
      console.log('BlockObserver: received new block');
      self.handlePaidRequests()
    })
  }

  async handlePaidRequests() {
    const waitPaidRequestList = await requestModel.find({status: RequestStatus.WAIT_PAID})

    waitPaidRequestList.forEach(request => {
      axios.get(this.url + `/api/addr/${request.address}/balance`)
           .then(function (response) {
              const balance = response.data

              resourceModel.findOne({_id: request.resourceID})
                .then(resource => {
                  if(resource.price < balance) {
                    issueToken(resource._id)

                    requestModel.update({ _id: request.id }, { status: RequestStatus.PAID }, _ => {})
                  }
                })
            })
    })
  }

}

module.exports = new BlockObserver()
