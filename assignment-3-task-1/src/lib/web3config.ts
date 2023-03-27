import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import ABI from './abi/RPS'

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
  appName: 'Rock Paper Scissors',
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
  address: '0xf01a1cd9b95426a3190d28717a789c7103fc9148',
  abi: ABI,
}

export { chains, connectors, contract, provider, wagmiClient }
