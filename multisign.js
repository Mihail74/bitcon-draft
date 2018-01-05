const bitcoin = require('bitcoinjs-lib')

const network = bitcoin.networks.testnet

// const key1 = bitcoin.ECPair.fromWIF('cTuiVaS3zWtsL5HRMgfvAnU8LCdiHpaMaAYAURbsdSXmSR6NM8qE', network)
// const key2 = bitcoin.ECPair.fromWIF('cNUqARPWHG3xJZpdcLK9dVKCwAKUbdoTZGzdPeTyJDFx5kpZ1Shc', network)
// const key3 = bitcoin.ECPair.fromWIF('cVmZxhsoBmGV6hq8139URtApKBAHoYKHGUfwYv5sPsgZXkeHegCB', network)

// --- generate 2-of-3 Address

var keyPairs = [
  'cTuiVaS3zWtsL5HRMgfvAnU8LCdiHpaMaAYAURbsdSXmSR6NM8qE',
  'cNUqARPWHG3xJZpdcLK9dVKCwAKUbdoTZGzdPeTyJDFx5kpZ1Shc',
  'cVmZxhsoBmGV6hq8139URtApKBAHoYKHGUfwYv5sPsgZXkeHegCB'
].map(function (wif) { return bitcoin.ECPair.fromWIF(wif, network) })
var pubKeys = keyPairs.map(function (x) { return x.getPublicKeyBuffer() })

var redeemScript = bitcoin.script.multisig.output.encode(2, pubKeys)
// var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
// var address = bitcoin.address.fromOutputScript(scriptPubKey, network)

// const address = '2N9WKwLhw8ApKfgi58CC2gxbasjhndCz1FR'
const returnAddress = 'muLceZVG6PJ5N49eSANwkgXhRaj1cmf9cm' // key1

var txb = new bitcoin.TransactionBuilder(network)
txb.addInput('09158da1a812d127e08d1278bf7c1504d78b781103ed0a39e4493f3842fb57ca', 0)
txb.addOutput(returnAddress, 129000000)

txb.sign(0, keyPairs[0], redeemScript)

//  ------ вариант с частичной подписью, сохранение и дальнейше подписью -----
// const txIncomplete = txb.buildIncomplete().toHex()
// const txb2 = bitcoin.TransactionBuilder.fromTransaction(bitcoin.Transaction.fromHex(txIncomplete), network)
// txb2.sign(0, keyPairs[2], redeemScript)
// const tx2 = txb2.build()
// console.log(tx2.toHex())
// 0100000001ca57fb42383f49e4390aed0311788bd704157cbf78128de027d112a8a18d150900000000fc0047304402201ffae46b996facca4d5c48103a6fa29cd2c36ade0d30f59c10b4bf226caa1807022061a17d4c9a6ec78248d34c3941e02707109430223b34841b3b56814cafcd254e0147304402202896af624c115a1be86a3235e3883f631e89608b29b30d24118beffc53ca55120220615bf591c47e9f25a460c8a9d2685cf7bb3b73ae32474a052f72f71e485dd869014c695221026d4e414b9879c39f3c3ff8169748ee526c37b8a31f18f24e51810b073a5b13ac2102e898eb64125d2cefe58c78296057860b0fab8888586313554bbe0ca8fe0cd8732103c9e60c9e143a7ef6d898ed5df732014bc4636de910e1cc18a81f8f2c7b48778853aeffffffff014062b007000000001976a914979d338af5efb30767d23ad29eb6739b3852a7df88ac00000000

// ---- вариант с подписью в один шаг-----
txb.sign(0, keyPairs[2], redeemScript)

const tx = txb.build()
console.log(tx.toHex())
// 0100000001ca57fb42383f49e4390aed0311788bd704157cbf78128de027d112a8a18d150900000000fc0047304402201ffae46b996facca4d5c48103a6fa29cd2c36ade0d30f59c10b4bf226caa1807022061a17d4c9a6ec78248d34c3941e02707109430223b34841b3b56814cafcd254e0147304402202896af624c115a1be86a3235e3883f631e89608b29b30d24118beffc53ca55120220615bf591c47e9f25a460c8a9d2685cf7bb3b73ae32474a052f72f71e485dd869014c695221026d4e414b9879c39f3c3ff8169748ee526c37b8a31f18f24e51810b073a5b13ac2102e898eb64125d2cefe58c78296057860b0fab8888586313554bbe0ca8fe0cd8732103c9e60c9e143a7ef6d898ed5df732014bc4636de910e1cc18a81f8f2c7b48778853aeffffffff014062b007000000001976a914979d338af5efb30767d23ad29eb6739b3852a7df88ac00000000

// 9ecf5cafc5e4d6b08330f7ce64d7bb634b2e530b1311e79a101f6002fc49d11f
