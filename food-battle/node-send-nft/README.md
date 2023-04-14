# API for send NFT 

_POST_
```shell
curl -X POST \
  https://food-battle-app.onrender.com/send \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"address": "0x1234567890abcdef"}'

# or see testApi.js
cat testApi.js
```

__Start App:__
```shell
npm install
# setup your .env file
node app.js
# for test API open another terminal and run
node testApi.js
```
