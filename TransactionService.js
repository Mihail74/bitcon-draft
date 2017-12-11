// const bitcoin = require("bitcoinjs-lib")
//
// let tx = new bitcoin.TransactionBuilder(bitcoin.networks.testnet);
// tx.addInput("dec298af232404e42c3d20c770450fbdb7cd059b6945ff70f9e82befc8ee0739", 0);
// tx.addOutput("2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF", 03240000);
// tx.sign(0, keyPair);
//
// const rawtx = tx.build().toHex()
//
// const params = new URLSearchParams()
// params.append('rawtx', rawtx)
// const res = await this._api.post('/tx/send', params)
