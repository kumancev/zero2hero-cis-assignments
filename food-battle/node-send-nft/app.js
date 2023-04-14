const express = require('express')
const app = express()
const { ethers } = require('ethers')
const abi = require('./abi')
require('dotenv').config()

const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545')
const privateKey = process.env.PRIVATE_KEY
const wallet = new ethers.Wallet(privateKey, provider)
const contractAddress = '0x951965D80B10ED2181A994E379aCB4f1DC96f340'
const contract = new ethers.Contract(contractAddress, abi, wallet)

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// Middleware for checking the access token
const requireToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) return res.status(401).send('Access token missing')
  if (token != process.env.AUTH_TOKEN) return res.status(403).send('Access token invalid')

  next()
}

app.post('/send', requireToken, async (req, res) => {
  const { address } = req.body

  // Send NFT to the specified address
  try {
    const token = await contract.tokenOfOwnerByIndex(wallet.address, 0)

    const tx = await contract.transferFrom(wallet.address, address, token)

    res.status(200).send(`Transaction hash: ${tx.hash}`)
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message)
  }
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
