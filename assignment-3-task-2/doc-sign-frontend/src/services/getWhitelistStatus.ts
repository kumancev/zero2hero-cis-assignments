import { readContract } from '@wagmi/core'

import { contract } from '../lib/web3config'
import merkleProof from '../lib/constant'

interface IStatus {
  text: string
  status: boolean
}

async function getIsWhitelist(address: `0x${string}`) {
  const bool = await readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'canSign',
    args: [address, merkleProof],
  })

  return bool
}

async function getIsClaimed(address: `0x${string}`) {
  const bool = await readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'claimed',
    args: [address],
  })

  return bool
}

export async function getStatus(address: `0x${string}`): Promise<IStatus | undefined> {
  const isWhitelistStatus = await getIsWhitelist(address)
  const isClaimedStatus = await getIsClaimed(address)

  if (!isClaimedStatus && isWhitelistStatus) {
    return { text: "Great! You're in whitelist. Now you can claim token", status: true }
  }

  if (!isWhitelistStatus) {
    return { text: "You're not in whitelist", status: false }
  }

  if (isClaimedStatus) {
    return { text: "You're already claimed", status: false}
  }
}
