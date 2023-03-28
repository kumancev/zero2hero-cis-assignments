import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import ABI from './abi'

const { chains, provider } = configureChains(
  [bscTestnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      }),
    }),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Document Signature',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

interface Contract {
  address: `0x${string}`
  abi: any
}

const contract: Contract = {
  address: '0x56Ca43552386408a48Fb7bB011a33cB3417385f2',
  abi: ABI,
}

export { chains, connectors, contract, provider, wagmiClient }
