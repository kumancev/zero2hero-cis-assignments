# tBNB Bootcamp Faucet 🚰
Site: https://tbnb-faucet.vercel.app

## How to Start App
Install git repo:
```bash
$ git clone https://github.com/kumancev/bnb-faucet
```
#### Run node backend:
```bash
$ cd node-faucet/
$ npm install
```
Then you need create .env file:
```bash
$ cat > .env
```
And add your keys:
```bash
# .env
PRIVATE_KEY = "PASTE_YOUR_PRIVATE_KEY"
SECRET_FOR_COOKIE = "PASTE_ANY_WORD"
PROVIDER_URL = "https://data-seed-prebsc-1-s1.binance.org:8545"
```
Run nodejs server:
```bash
$ npm run dev  # using nodemon
# or
$ node index.js
```
#### Run frontend app:
Open another terminal 
```bash
$ cd front-faucet/
$ npm install
$ npm run dev
```
#### That's it!