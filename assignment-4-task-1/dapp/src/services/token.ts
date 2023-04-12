import { readContract } from '@wagmi/core'
import { token_contract } from '../lib/config'

const balanceToken = async (account: `0x${string}`) => {
  const data = await readContract({
    address: token_contract.address,
    abi: token_contract.abi,
    functionName: 'balanceOf',
    args: [account],
  })

  return data
}

export { balanceToken }
