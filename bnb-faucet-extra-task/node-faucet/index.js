const express = require('express')
const session = require('cookie-session')
const cookieParser = require('cookie-parser')
const sendEth = require('./blockchain');

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(session({
  secret: process.env.SECRET_FOR_COOKIE,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // Set session cookie with max age of 24 hours
}))
app.post('/send', sendEth)
app.listen(3000, () => console.log('Server listening on port 3000'))
