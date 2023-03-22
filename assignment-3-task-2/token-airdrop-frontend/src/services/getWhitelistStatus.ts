import { readContract } from '@wagmi/core'

import { contract } from '../lib/web3config'
import merkleProof from '../lib/constant'

const getWhitelistStatus = async (address: `0x${string}`) => {
  const bool =
    await readContract({
      address: contract.address,
      abi: contract.abi,
      functionName: 'canClaim',
      args: [address, merkleProof],
    })

  return bool
}

export default getWhitelistStatus
