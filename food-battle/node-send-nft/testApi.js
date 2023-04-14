const axios = require('axios')
require('dotenv').config()

const token = process.env.AUTH_TOKEN
const data = { address: '0x9Aa88b9DC55E51C84F34Ec2571874d2bca89d516' }

axios.post('http://localhost:3000/send', data, {
  headers: { Authorization: token }
})
  .then(response => {
    console.log('Success:', response.status)
  })
  .catch(error => {
    console.error('Error:', error.message)
  })
