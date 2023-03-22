import React from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import { chains, wagmiClient } from './lib/web3config'
import HomePage from './pages/HomePage'

import './App.css'

function App() {

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode>
          <HomePage />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
