const express = require('express')
const app = express()
const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider('RPC_PROVIDER')
const privateKey = 'YOUR_PRIVATE_KEY'
const wallet = new ethers.Wallet(privateKey, provider)
const contractAddress = 'YOUR_CONTRACT_ADDRESS'
const abi = [
  // ERC721 ABI
]
const contract = new ethers.Contract(contractAddress, abi, wallet)

app.use(express.json())

let tokenId = 1

// Middleware for checking the access token
const requireToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).send('Access token missing')
  }

  next()
}

app.post('/send', requireToken, async (req, res) => {
  const { address } = req.body

  // Send NFT to the specified address
  try {
    const tx = await contract.transferFrom(wallet.address, address, tokenId)
    console.log(`Transaction hash: ${tx.hash}`)

    tokenId++

    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message)
  }
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
