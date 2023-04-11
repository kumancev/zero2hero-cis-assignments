import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import NFT_ABI from './abi/NFT'
import STAKING_ABI from './abi/NFTStaking'

const { chains, provider } = configureChains(
  [bscTestnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_RPC_URL ?? '',
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

export {
  chains,
  connectors,
  staking_contract,
  nft_contract,
  provider,
  wagmiClient,
}
