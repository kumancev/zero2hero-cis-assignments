import React, { useState } from 'react'
import Header from './components/Header'
import Play from './components/Play'
import Game from './components/Game'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'

import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig, useAccount } from 'wagmi'
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
  const { address } = useAccount()

  const [myChoice, setMyChoice] = useState('')
  const [score, setScore] = useState<number>(0)

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="container">
          <Header score={score} />
          {address ? (
            <Routes>
              <Route path="/" element={<Play setMyChoice={setMyChoice} />} />
              <Route path="/game" element={<Game />} />
            </Routes>
          ) : (
            <div className='connect-before'>
              <h1>Connect your wallet before start</h1>
            </div>
          )}
        </div>
        <Footer />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
