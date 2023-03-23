import React, { useEffect, useState } from 'react'
import { getStatus } from '../services/getWhitelistStatus'
import { getClaimToken } from '../services/getClaimToken'
import { useAccount } from 'wagmi'
import Loader from './Loader'

export default function Claim() {
  const { address } = useAccount()

  const [textStatus, setTextStatus] = useState<string | null>(null)
  const [canClaim, setCanClaim] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getAddressStatus = async (address: `0x${string}`) => {
      const status = await getStatus(address)

      return status
    }

    if (address) {
      getAddressStatus(address).then((status) => {
        setTextStatus(status?.text as string)
        setCanClaim(status?.status as boolean)
        setIsLoading(false)
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

  return (
    <div>
      {isLoading && <Loader />}
      <p>{textStatus}</p>
      {canClaim && <button onClick={handleClaim}>Claim</button>}
    </div>
  )
}
