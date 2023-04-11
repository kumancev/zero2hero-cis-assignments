import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import TOKEN_ABI from './abi/Token'
import NFT_ABI from './abi/NFT'
import STAKING_ABI from './abi/NFTStaking'

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
  appName: 'NFT Staking',
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

const staking_contract: Contract = {
  address:
    (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`) ??
    '0x4e9Ed617d43Ed0a405Dc6defad55d4f77387b122',
  abi: STAKING_ABI,
}

const nft_contract: Contract = {
  address: '0xd26DC61248914B9b7E9e1231b89757Eca7470D06',
  abi: NFT_ABI,
}

const token_contract: Contract = {
  address: '0xee567f65f0c86406F9f92cEfFFBd7377f3Ca8e43',
  abi: NFT_ABI,
}

export {
  chains,
  connectors,
  token_contract,
  nft_contract,
  staking_contract,
  provider,
  wagmiClient,
}
