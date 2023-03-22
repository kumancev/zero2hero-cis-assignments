import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import ABI from './abi';

const { chains, provider } = configureChains(
  [bscTestnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: 'https://data-seed-prebsc-1-s1.binance.org:8545'
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Rock Finger Scissors',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

interface Contract {
  address: `0x${string}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi: any;
}

const contract: Contract = {
  address: '0x2E0cb96756a2989734ec0d4B54c7091A86E4C8fB',
  abi: ABI,
};

export { chains, connectors, contract, provider, wagmiClient };