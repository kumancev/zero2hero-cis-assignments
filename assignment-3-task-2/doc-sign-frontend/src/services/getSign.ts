import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core'

import { contract } from '../lib/web3config'
import merkleProof from '../lib/constant'

export async function getSign() {
  const config = await prepareWriteContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'sign',
    args: [merkleProof],
  })

  const { hash } = await writeContract(config)

  const data = await waitForTransaction({
    hash,
  })

  return data
}
