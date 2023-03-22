import React, { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { getIsWhitelist, getIsClaimed } from '../services/getWhitelistStatus'
import { getClaimToken } from '../services/getClaimToken'
import { useAccount } from 'wagmi'

export default function HomePage() {
  const { address } = useAccount()

  const [isWhitelist, setIsWhitelist] = useState<boolean | null>(null)
  const [isClaimed, setIsClaimed] = useState<boolean | null>(null)

  useEffect(() => {
    const getStatus = async (address: `0x${string}`) => {
      const isWhitelistStatus = await getIsWhitelist(address)
      const isClaimedStatus = await getIsClaimed(address)

      return { isWhitelistStatus, isClaimedStatus }
    }

    if (address) {
      getStatus(address).then(({ isWhitelistStatus, isClaimedStatus }) => {
        setIsWhitelist(isWhitelistStatus as any)
        setIsClaimed(isClaimedStatus as any)
      })
    }
  }, [address])

  async function handleClaim() {
    try {
      await getClaimToken()
    } catch (e) {
      console.error(e);
    }
  }

  const textIsWhiteList = isWhitelist ? (
    <>
      <p>Great! You're in whitelist. Now you can claim token</p>
      <button onClick={handleClaim}>Claim</button>
    </>
  ) : (
    <p>You're not in whitelist</p>
  )

  return (
    <div>
      <ConnectButton />

      {isClaimed ? <p>You're already claimed</p> : textIsWhiteList}
    </div>
  )
}
