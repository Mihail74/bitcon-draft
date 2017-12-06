var bitcoin = require("bitcoinjs-lib")
var axios = require("axios")

var testnet = bitcoin.networks.testnet

//Generate keyPair
// var keyPair = bitcoin.ECPair.makeRandom({ network: testnet })
// console.log(keyPair.getAddress());
// console.log(keyPair.toWIF());

// msfjpY6BfACW5Rj5wpdJi9VXgKRD4swuC7
// cV5bupsrQH59Nh9QGgzyk8b6UtGKQRtr1Ekrye2GRFFiW5xrMS6N

//load from priveKey WIF
var keyPair = bitcoin.ECPair.fromWIF('cV5bupsrQH59Nh9QGgzyk8b6UtGKQRtr1Ekrye2GRFFiW5xrMS6N', testnet)

// console.log(keyPair.getAddress());
// console.log(keyPair.toWIF());

var tx = new bitcoin.TransactionBuilder(testnet);
tx.addInput("c24b65aa607d5f39e3ab77deac30a9adbf8f8dddaaf61af34f8304f1ad183a20", 0);
tx.addOutput("mgRoeWs2CeCEuqQmNfhJjnpX8YvtPACmCX", 130000000);
tx.sign(0, keyPair);

let txHash = tx.build().toHex()
console.log(txHash)


// 0100000001203a18adf104834ff31af6aadd8d8fbfada930acde77abe3395f7d60aa654bc2000000006a47304402206849cc43e753778b5eaf8e9067dfb8156491fc643463e85ce1fc519e23aa785f022061943b579fcf24913f0e7ac662817014aadb145af77e5f35003bdbab31076d4c01210243f77b392dcbe1572d7f19af8ef191a554d5a5e1e0ace23b3ba64211809f3939ffffffff0180a4bf07000000001976a91409fed3e08e624b23dbbacc77f7b2a39998351a6888ac00000000
