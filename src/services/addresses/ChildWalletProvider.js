const bitcoin = require("bitcoinjs-lib")
const bip39 = require("bip39")
const db = require('../../db')

class ChildWalletProvider {
  constructor(base58master){
    this.hdMaster = bitcoin.HDNode.fromBase58(base58master, bitcoin.networks.testnet)
  }

  makeChild(index){
    return this.hdMaster.derivePath(`m/44'/0'/0'/0/${index}`)
  }

  static makeRandom(){
    let mnemonic = bip39.generateMnemonic()
    let seed = bip39.mnemonicToSeed(mnemonic)
    return bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks.testnet)
  }
}
//childWalletProvider.constructor.makeRandom().toBase58()

db.Address.find({isMaster: true}, function (err, addresses) {
  if (err) return console.error(err);
  console.log(addresses);
})
module.exports = new ChildWalletProvider('tprv8ZgxMBicQKsPdyFHnaAgCK6sG7AYVmmg1L95QYkxXX7huKs2sj1zetgJMZDT9WxAwzvX5wRyzYzdr416f8Bmdypx8P8qrXcLuhmW7Au2D6e')
