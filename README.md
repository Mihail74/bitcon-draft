## Prerequisites

1. Install node v9.2.0+, install npm 5.5.1+

2. Install and launch mongodb service

3. Install pm2

3. Update these config files:
- config/default.json
- config/production.json

4. Insert in `addresses` collection in **mongodb**
```
{
    "base58" : "tprv8ZgxMBicQKsPdyFHnaAgCK6sG7AYVmmg1L95QYkxXX7huKs2sj1zetgJMZDT9WxAwzvX5wRyzYzdr416f8Bmdypx8P8qrXcLuhmW7Au2D6e",
    "isMaster" : true,
    "index" : 0,
    "coinType" : 1,
    "address" : "mkWJVxmxEELe3mhaQxt39GAJVfkKb4b9hT"
}
```

## Setup & Run

``` bash
# install dependencies
npm install

# start web app and loop using development settings (use together with `npm run dev` from shell.ople.ai)
pm2 start ecosystem.config.js

# start web app and loop using production settings
pm2 start ecosystem.config.js --env production

# stop web app and loop
pm2 stop ecosystem.config.js

```
