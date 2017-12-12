
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const addressesRouting = require('./routers/addresses')
const db = require('./db')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/address', addressesRouting)


app.listen(3000, () => console.log('Example app listening on port 3000!'))
