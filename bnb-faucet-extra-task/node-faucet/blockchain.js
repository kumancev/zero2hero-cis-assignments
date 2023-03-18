const Web3 = require('web3')
const ip = require('ip')
require('dotenv').config()

const provider = new Web3.providers.HttpProvider(process.env.PROVIDER_URL)

const web3 = new Web3(provider)

const privateKey = process.env.PRIVATE_KEY
const account = web3.eth.accounts.privateKeyToAccount(privateKey)

const sentAddresses = {}
const userSessions = {}
const lastTransactionTimes = {}

async function sendEth(req, res) {
  const toAddress = req.body.toAddress
  const amount = web3.utils.toWei('0.2', 'ether')
  const sessionId = req.cookies.sessionId || req.session.id
  const ipAddress = ip.address()

  if (userSessions[sessionId] || sentAddresses[ipAddress]) {
    const lastInteractionTime = Math.max(userSessions[sessionId] || 0, sentAddresses[ipAddress] || 0)
    if (lastInteractionTime && (Date.now() - lastInteractionTime) < (24 * 60 * 60 * 1000)) {
      res.status(403).send(`Error: User already interacted with the site within the past 24 hours.`)
      return
    }
  } else {
    userSessions[sessionId] = Date.now()
    sentAddresses[ipAddress] = Date.now()
  }
  
  // Check whether the toAddress has been used for a transaction within the last 24 hours
  if (lastTransactionTimes[toAddress] && (Date.now() - lastTransactionTimes[toAddress]) < (24 * 60 * 60 * 1000)) {
    res.status(403).send(`Error: Address ${toAddress} has already been used for a transaction within the past 24 hours.`)
    return
  }

  const tx = {
    to: toAddress,
    value: amount,
    gas: 21000,
    gasPrice: web3.utils.toWei('20', 'gwei')
  }
  const signedTx = await account.signTransaction(tx)
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)

  lastTransactionTimes[toAddress] = Date.now()
  sentAddresses[ipAddress] = Date.now()

  res.cookie('sessionId', sessionId, { maxAge: 24 * 60 * 60 * 1000 }) // Set cookie with max age of 24 hours
  res.status(200).send(receipt.transactionHash)
}


module.exports = sendEth;