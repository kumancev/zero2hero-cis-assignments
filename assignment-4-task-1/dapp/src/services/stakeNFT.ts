import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
  readContract,
} from '@wagmi/core'
import { staking_contract } from '../lib/config'

const stakeNFT = async (tokenId: number) => {
  const config = await prepareWriteContract({
    address: staking_contract.address,
    abi: staking_contract.abi,
    functionName: 'stake',
    args: [tokenId],
  })

  const { hash } = await writeContract(config)

  const data = await waitForTransaction({
    hash,
  })

  return data
}

const withdrawNFT = async (tokenId: number) => {
  const config = await prepareWriteContract({
    address: staking_contract.address,
    abi: staking_contract.abi,
    functionName: 'withdraw',
    args: [tokenId],
  })

  const { hash } = await writeContract(config)

  const data = await waitForTransaction({
    hash,
  })

  return data
}

const claimRewards = async () => {
  const config = await prepareWriteContract({
    address: staking_contract.address,
    abi: staking_contract.abi,
    functionName: 'claimRewards',
    args: [],
  })

  const { hash } = await writeContract(config)

  const data = await waitForTransaction({
    hash,
  })

  return data
}

const avaibleRewards = async (owner: `0x${string}`) => {
  const data = await readContract({
    address: staking_contract.address,
    abi: staking_contract.abi,
    functionName: 'avaibleRewards',
    args: [owner],
  })

  return data
}

const stakedTokens = async (owner: `0x${string}`) => {
  const data = await readContract({
    address: staking_contract.address,
    abi: staking_contract.abi,
    functionName: 'getStakedTokens',
    args: [owner],
  })

  return data
}

export { stakeNFT, withdrawNFT, claimRewards, avaibleRewards, stakedTokens }
