var bitcoin = require("bitcoinjs-lib")
var axios = require("axios")
var bip39 = require("bip39")

var testnet = bitcoin.networks.testnet

//Generate keyPair
// var keyPair = bitcoin.ECPair.makeRandom({ network: testnet })
// console.log(keyPair.getAddress());
// console.log(keyPair.toWIF());

// address: mjgMoPhHkYnWcJyTwQAasSUZjwYknWfbFf
// wif: cVGi5WiBMLSGbWDsadZNdCzpm4zXJa8LHAm8p5ytbS8VdQB9Bj3e

//faucet tx: 945486ada7998934fdecbbd6dc9ee6e0117a57ba3d766c1875c9edbcaea2c173

//load from priveKey WIF
// var keyPair = bitcoin.ECPair.fromWIF('cVGi5WiBMLSGbWDsadZNdCzpm4zXJa8LHAm8p5ytbS8VdQB9Bj3e', testnet)
//
// var tx = new bitcoin.TransactionBuilder(testnet);
// tx.addInput("945486ada7998934fdecbbd6dc9ee6e0117a57ba3d766c1875c9edbcaea2c173", 0);
// tx.addOutput("2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF", 129000000);
// tx.sign(0, keyPair);
//
// let txHash = tx.build().toHex()
// console.log(txHash)

//0107d8ecbd068984472238b3be982ad2d54b5cc9e8705ead6c4a14bf824f9464


//MNEMONIC
// let mnemonic = bip39.generateMnemonic()
// var seed = bip39.mnemonicToSeed(mnemonic)
//
// var hdMaster = bitcoin.HDNode.fromSeedBuffer(seed, testnet)
//
// console.log(hdMaster.toBase58())
// // tprv8ZgxMBicQKsPdyFHnaAgCK6sG7AYVmmg1L95QYkxXX7huKs2sj1zetgJMZDT9WxAwzvX5wRyzYzdr416f8Bmdypx8P8qrXcLuhmW7Au2D6e
//
// var key1 = hdMaster.derivePath('m/0')
// var key2 = hdMaster.derivePath('m/1')
// // "m/44'/0'/0'/0/0"
// console.log(key1.keyPair.getAddress())
// console.log(key2.keyPair.getAddress())
// // key1 address: mtWa7DKPNwfVQ9ivgb6XUonim5gfCJv17p
// // key2 address: mrL1bP556Q19Q1WWcjYEFdvhsnLu3S4W5p



// Restore
// var hdMaster = bitcoin.HDNode.fromBase58('tprv8ZgxMBicQKsPdyFHnaAgCK6sG7AYVmmg1L95QYkxXX7huKs2sj1zetgJMZDT9WxAwzvX5wRyzYzdr416f8Bmdypx8P8qrXcLuhmW7Au2D6e', testnet)
// var keyPair = hdMaster.derivePath('m/0').keyPair
// console.log(keyPair.getAddress())
//
// var tx = new bitcoin.TransactionBuilder(testnet);
// tx.addInput("dec298af232404e42c3d20c770450fbdb7cd059b6945ff70f9e82befc8ee0739", 0);
// tx.addOutput("2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF", 03240000);
// tx.sign(0, keyPair);
//
// let txHash = tx.build().toHex()
// console.log(txHash)

//01000000013907eec8ef2be8f970ff45699b05cdb7bd0f4570c7203d2ce4042423af98c2de000000006a473044022031f8209bd7e838381f88f2e577018f669c8c44b9d8b71e0479bb988f7179fc8e02202dfe5718eed0dd062bfdf9c759c06df6c0bf221c1e84697d01281bd8bb5d87a701210339027ee0b470f5bd270d128cf0121dd910f20a3161de5581276f145177c07e46ffffffff0100006a000000000017a914a9974100aeee974a20cda9a2f545704a0ab54fdc8700000000
