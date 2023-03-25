import React, { useState } from 'react'
import Header from './components/Header'
import Play from './components/Play'
import Game from './components/Game'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'

import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains([bscTestnet], [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: 'Web3 Rock Paper Scissors game',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function App() {
  const [myChoice, setMyChoice] = useState('')
  const [score, setScore] = useState(0)

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="container">
          <Header score={score} />
          <Routes>
            <Route path="/" element={<Play setMyChoice={setMyChoice} />} />
            <Route
              path="/game"
              element={
                <Game myChoice={myChoice} score={score} setScore={setScore} />
              }
            />
          </Routes>
        </div>
        <Footer />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
