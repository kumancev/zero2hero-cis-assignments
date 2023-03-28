import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import { chains, wagmiClient } from './lib/web3config'

import './App.scss'
import Home from './scenes/Home'

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode>
        <Home />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
