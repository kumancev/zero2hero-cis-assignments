import { readContract } from '@wagmi/core'

import { contract } from '../lib/web3config'
import merkleProof from '../lib/constant'

export async function getIsWhitelist(address: `0x${string}`) {
  const bool =
    await readContract({
      address: contract.address,
      abi: contract.abi,
      functionName: 'canClaim',
      args: [address, merkleProof],
    })

  return bool
}

export async function getIsClaimed(address: `0x${string}`) {
  const bool =
    await readContract({
      address: contract.address,
      abi: contract.abi,
      functionName: 'claimed',
      args: [address],
    })

  return bool
}

