import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
  readContract,
} from '@wagmi/core'
import { ethers } from 'ethers'
import { nft_contract } from '../lib/config'

const mintNFT = async (minter: `0x${string}`) => {
  const config = await prepareWriteContract({
    address: nft_contract.address,
    abi: nft_contract.abi,
    functionName: 'mint',
    args: [minter],
    overrides: {
      value: ethers.utils.parseEther('0.001'),
    },
  })

  const { hash } = await writeContract(config)

  const data = await waitForTransaction({
    hash,
  })

  return data
}

const balanceNFT = async (owner: `0x${string}`) => {
  const data = await readContract({
    address: nft_contract.address,
    abi: nft_contract.abi,
    functionName: 'balanceOf',
    args: [owner],
  })

  return data
}

const urlsNFT = async (owner: `0x${string}`, balance: number) => {
  let urls = []

  for (let i = 0; i < balance; i++) {
    const tokenId = await readContract({
      address: nft_contract.address,
      abi: nft_contract.abi,
      functionName: 'tokenOfOwnerByIndex',
      args: [owner, i],
    })

    let tokenMetadataURI = await readContract({
      address: nft_contract.address,
      abi: nft_contract.abi,
      functionName: 'tokenURI',
      args: [tokenId],
    })

    urls.push(tokenMetadataURI)
  }

  return urls
}

export { mintNFT, balanceNFT, urlsNFT }
