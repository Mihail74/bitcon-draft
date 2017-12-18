const bitcoin = require('bitcoinjs-lib')
const bip39 = require('bip39')
const AddressModel = requireRoot('src/models/Address')

class ChildAddressProvider {
  constructor (network) {
    this.network = network
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
      // TODO: throw error
      process.exit(1)
    }
    console.log('ChildAddressProvider: master node loaded successfully')
    this.hdMaster = bitcoin.HDNode.fromBase58(masterNode.base58, this.network)
    return this.hdMaster
  }

  async loadNextChildIndex () {
    console.log('ChildAddressProvider: max child index loading')
    const nodeWithActualChildIndex = await AddressModel.findOne().sort('-index').exec()
    console.log('ChildAddressProvider: max child index loaded successfully')

    this.nextIndex = nodeWithActualChildIndex.index + 1
    return this.nextIndex
  }

  async nextChildAddress () {
    const nextIndex = this.getNextIndex()
    // TODO: `m/44'/{coinType}'/{account/cluster Numbers}'/0/${nextIndex}`
    const childNode = this.hdMaster.derivePath(`m/44'/0'/0'/0/${nextIndex}`)

    await this.saveAddress(childNode.getAddress(), nextIndex)
    return childNode.getAddress()
  }

  getNextIndex () {
    return this.nextIndex++
  }

  async saveAddress (address, index) {
    const newAddress = new AddressModel({address, index})
    return newAddress.save()
  }

  static makeRandom () {
    let mnemonic = bip39.generateMnemonic()
    let seed = bip39.mnemonicToSeed(mnemonic)
    return bitcoin.HDNode.fromSeedBuffer(seed, this.network)
  }
}

module.exports = new ChildAddressProvider(bitcoin.networks.testnet)

// tprv8ZgxMBicQKsPdyFHnaAgCK6sG7AYVmmg1L95QYkxXX7huKs2sj1zetgJMZDT9WxAwzvX5wRyzYzdr416f8Bmdypx8P8qrXcLuhmW7Au2D6e
// mkWJVxmxEELe3mhaQxt39GAJVfkKb4b9hT
