const keystone = require('keystone')
const bitcoin = require('bitcoinjs-lib')
const config = require('config')
const bip39 = require('bip39')

const AddressModel = keystone.list('Address').model

class ChildAddressProvider {
  constructor (network) {
    const bitcoinConfig = config.get('bitcoin')
    this.nodeNumber = config.get('nodeNumber')
    this.network = bitcoinConfig.testnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin
    this.coinType = bitcoinConfig.testnet ? 1 : 0

    this.hdMaster = bitcoin.HDNode.fromBase58(bitcoinConfig.masterBase58, this.network)
  }

  async initialize () {
    console.log('ChildAddressProvider: initialize start')
    await this.loadNextChildIndex()
    console.log('ChildAddressProvider: initialize finished')
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

    return this.saveAddress(childNode.getAddress(), nextIndex)
  }

  getNextIndex () {
    return this.nextIndex++
  }

  async saveAddress (address, index) {
    const newAddress = new AddressModel({
      address,
      index,
      nodeNumber: this.nodeNumber,
      coinType: this.coinType
    })
    return newAddress.save()
  }

  static makeRandom () {
    let mnemonic = bip39.generateMnemonic()
    let seed = bip39.mnemonicToSeed(mnemonic)
    return bitcoin.HDNode.fromSeedBuffer(seed, this.network)
  }
}

module.exports = new ChildAddressProvider()
