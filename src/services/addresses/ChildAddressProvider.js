const bitcoin = require('bitcoinjs-lib')
const config = require('config')
const bip39 = require('bip39')
const AddressModel = requireRoot('src/models/Address')

class ChildAddressProvider {
  constructor (network) {
    const isTestNet = config.get('testnet')

    this.network = isTestNet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
    this.coinType = isTestNet ? 1 : 0
    this.nodeNumber = config.get('nodeNumber')
  }

  async initialize () {
    console.log('ChildA0ddressProvider: initialize start')
    await this.loadMasterNode()
    await this.loadNextChildIndex()
    console.log('ChildAddressProvider: initialize finished')
  }

  async loadMasterNode () {
    console.log('ChildAddressProvider: master node loading')
    const masterNode = await AddressModel.findOne({isMaster: true})
    if (masterNode == null) {
      console.log('ChildAddressProvider: master node load faield')
      throw new Error(`No master node in db`)
    }
    console.log('ChildAddressProvider: master node loaded successfully')
    this.hdMaster = bitcoin.HDNode.fromBase58(masterNode.base58, this.network)
    return this.hdMaster
  }

  async loadNextChildIndex () {
    console.log('ChildAddressProvider: max child index loading')
    const nodeWithActualChildIndex = await AddressModel.findOne({ nodeNumber: this.nodeNumber }).sort('-index').exec()
    console.log('ChildAddressProvider: max child index loaded successfully')

    this.nextIndex = nodeWithActualChildIndex == null ? 1 : nodeWithActualChildIndex.index + 1
    return this.nextIndex
  }

  async nextChildAddress () {
    const nextIndex = this.getNextIndex()

    const childNode = this.hdMaster.derivePath(`m/44'/${this.coinType}'/${this.nodeNumber}'/0/${nextIndex}`)

    await this.saveAddress(childNode.getAddress(), nextIndex)
    return childNode.getAddress()
  }

  getNextIndex () {
    return this.nextIndex++
  }

  async saveAddress (address, index) {
    const newAddress = new AddressModel({ address, index, nodeNumber: this.nodeNumber })
    return newAddress.save()
  }

  static makeRandom () {
    let mnemonic = bip39.generateMnemonic()
    let seed = bip39.mnemonicToSeed(mnemonic)
    return bitcoin.HDNode.fromSeedBuffer(seed, this.network)
  }
}

module.exports = new ChildAddressProvider()

// tprv8ZgxMBicQKsPdyFHnaAgCK6sG7AYVmmg1L95QYkxXX7huKs2sj1zetgJMZDT9WxAwzvX5wRyzYzdr416f8Bmdypx8P8qrXcLuhmW7Au2D6e
// mkWJVxmxEELe3mhaQxt39GAJVfkKb4b9hT
